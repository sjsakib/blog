import React from 'react';
import { graphql, Link } from 'gatsby';
import { FaTags, FaCalendarAlt } from 'react-icons/fa';
import { FacebookProvider, Comments, Like } from 'react-facebook';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Subscribe from '../components/subscribe';
import '../components/styles/post.scss';

export default function PostTemplate({ data, children }) {
  const { mdx } = data;

  const { frontmatter } = mdx ?? {};
  if (!frontmatter) return null;
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
  const hasMeta = tags?.length || date;
  return (
    <Layout>
      <Seo
        title={title}
        description={subtitle}
        ogImage={image && image.childImageSharp.fixed.src}
        ogType="article"
      />
      <div className="post page">
        <div className="post-heading">
          <h1 className="display-5">{title}</h1>
          {hasMeta && (
            <p>
              {tags && (
                <span className="post-meta">
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
                </span>
              )}
              {date && (
                <span className="post-meta">
                  <FaCalendarAlt /> {date}
                </span>
              )}
            </p>
          )}
        </div>
        {children}
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
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        rootUrl
        fbAppId
      }
    }
    mdx(frontmatter: { path: { eq: $path } }) {
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
