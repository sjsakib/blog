---
path: "/blog/my-first-post"
type: post
date: "2017-11-07"
title: "My first blog post"
---



```jsx{numberLines: true}
import React from 'react';
import { graphql } from 'gatsby';
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
          <h1 className="display-1">{frontmatter.title}</h1>
          <p>
            <span className="post-meta">
              {frontmatter.tags && (
                <>
                  <FaTags /> {frontmatter.tags.join(', ')}
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
  // highlight-start
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
```

Is it working? This is an inline code `js।console.log('works!');`

```python
print(f'1+1 is {1+1}')
```