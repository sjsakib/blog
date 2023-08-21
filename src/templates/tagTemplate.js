import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout';
import Seo from '../components/seo';
import PostCard from '../components/PostCard';
import '../components/styles/post.scss';

export default function TagTemplate(props) {
  const { data } = props;
  const tag = props.pageContext.tag;

  const mediumSlugs = [];

  let posts = data.allMdx.edges.map(edge => {
    const { id, frontmatter } = edge.node;
    const {
      date,
      dateString,
      title,
      subtitle,
      image,
      path,
      mediumSlug,
    } = frontmatter;

    mediumSlug && mediumSlugs.push(mediumSlug);

    return {
      id,
      date,
      dateString,
      title,
      subtitle,
      image: image?.childImageSharp.gatsbyImageData,
      href: path,
    };
  });

  posts = posts.concat(
    data.allMediumPost.edges
      .filter(({ node }) => !mediumSlugs.includes(node.uniqueSlug))
      .map(edge => {
        const {
          id,
          createdAt,
          dateString,
          title,
          image,
          uniqueSlug,
          virtuals,
        } = edge.node;
        const { subtitle } = virtuals;

        return {
          id,
          date: createdAt,
          dateString,
          title,
          subtitle,
          image: image && image.childImageSharp.fluid,
          href: 'https://medium.com/stories/' + uniqueSlug,
        };
      })
  );

  posts.sort((a, b) => b.date - a.date);

  const title = `Tag: ${tag}`;
  return (
    <Layout>
      <div className="page">
        <section id="blog">
          <h1>{title}</h1>
          <div className="space" />
          <Row>
            {posts.map(p => (
              <Col md={6} key={p.id}>
                <PostCard {...p} />
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($tag: String) {
    allMediumPost(
      filter: { virtuals: { tags: { elemMatch: { slug: { eq: $tag } } } } }
    ) {
      edges {
        node {
          id
          title
          uniqueSlug
          dateString: createdAt(formatString: "MMMM DD, YYYY")
          createdAt(formatString: "X")
          virtuals {
            subtitle
          }
          image {
            childImageSharp {
              gatsbyImageData(aspectRatio: 2)
            }
          }
        }
      }
    }
    allMdx(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      edges {
        node {
          id
          frontmatter {
            path
            date(formatString: "X")
            dateString: date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            mediumSlug
            image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 2)
              }
            }
          }
        }
      }
    }
  }
`;

export function Head({ pageContext }) {
  const { tag } = pageContext;
  const title = `Tag: ${tag}`;
  return (
    <Seo title={title + ' | Blog'} description={'All posts tagged: ' + tag} />
  );
}
