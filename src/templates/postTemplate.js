import React from 'react';
import { graphql, Link } from 'gatsby';
import { FaTags, FaCalendarAlt } from 'react-icons/fa';
import { FacebookProvider, Comments, Like } from 'react-facebook';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Subscribe from '../components/subscribe';
import '../components/styles/post.scss';

export default ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;
  const {
    path,
    title,
    subtitle,
    date,
    tags,
    image,
    allowComments,
    type,
  } = frontmatter;
  const { rootUrl, fbAppId } = data.site.siteMetadata;
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
                <React.Fragment>
                  <FaTags />{' '}
                  {tags
                    .map(t => (
                      <Link key={t} className="tag-link" to={`/tags/${t}/`}>
                        {t}
                      </Link>
                    ))
                    .reduce((prev, next) => [prev, ', ', next])}
                </React.Fragment>
              )}
            </span>
            <span className="post-meta">
              <FaCalendarAlt /> {date}
            </span>
          </p>
        </div>
        <MDXRenderer>{body}</MDXRenderer>
        {type === 'post' && <Subscribe />}
        {allowComments && fbAppId && (
          <div className="fb">
            <FacebookProvider appId={fbAppId}>
              <Like
                href={rootUrl + path}
                showFaces
                share
                size="large"
                width="300"
              />
              <Comments
                className="fb-comments"
                href={rootUrl + path}
                width="100%"
              />
            </FacebookProvider>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        rootUrl
        fbAppId
      }
    }
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        tags
        type
        image {
          childImageSharp {
            fixed(width: 2400, height: 1260) {
              src
            }
          }
        }
        allowComments
      }
    }
  }
`;
