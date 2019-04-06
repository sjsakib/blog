import React from 'react';
import { graphql, Link } from 'gatsby';
import { FaTags, FaRegCalendarAlt } from 'react-icons/fa';

import Layout from '../components/layout';
import '../components/styles/post.scss';

export default ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <div className="post">
        <div className="post-heading">
          <h1 className="display-5">{frontmatter.title}</h1>
          <p>
            <span className="post-meta">
              {frontmatter.tags && (
                <>
                  <FaTags />{' '}
                  {frontmatter.tags
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
              <FaRegCalendarAlt /> {frontmatter.date}
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
        tags
      }
    }
  }
`;
