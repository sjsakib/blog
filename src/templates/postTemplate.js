import React from 'react';
import { graphql } from 'gatsby';
import { FaTags, FaRegCalendarAlt } from 'react-icons/fa';

import Layout from '../components/layout';
import '../components/styles/post.scss';

export default ({ data }) => {
  const { markdownRemark } = data;
  console.log(frontmatter);
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <div className="post">
        <div className="post-heading">
          <h1 className="display-1">{frontmatter.title}</h1>
          <p>
            <span className="post-meta">
              <FaTags /> {frontmatter.tags.join(', ')}
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
