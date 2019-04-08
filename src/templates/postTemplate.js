import React from 'react';
import { graphql, Link } from 'gatsby';
import { FaTags, FaRegCalendarAlt } from 'react-icons/fa';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../components/styles/post.scss';

export default ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, subtitle, date, tags, image } = frontmatter;
  return (
    <Layout>
      <SEO
        title={title}
        description={subtitle}
        ogImage={image && image.childImageSharp.fixed.src}
        ogType="article"
      />
      <div className="post page">
        <div className="post-heading">
          <h1 className="display-5">{title}</h1>
          <p>
            <span className="post-meta">
              {tags && (
                <>
                  <FaTags />{' '}
                  {tags
                    .map(t => (
                      <Link key={t} className="tag-link" to={`/tags/${t}`}>
                        {t}
                      </Link>
                    ))
                    .reduce((prev, next) => [prev, ', ', next])}
                </>
              )}
            </span>
            <span className="post-meta">
              <FaRegCalendarAlt /> {date}
            </span>
          </p>
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        tags
        image {
          childImageSharp {
            fixed(width: 2400, height: 1260) {
              src
            }
          }
        }
      }
    }
  }
`;
