import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import PostCard from './PostCard';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMediumPost(sort: { fields: [createdAt], order: DESC }) {
        edges {
          node {
            id
            title
            uniqueSlug
            virtuals {
              subtitle
              tags {
                slug
              }
            }
            image {
              childImageSharp {
                fluid(maxHeight: 500, maxWidth: 1000, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `);
  console.log(data);
  return (
    <section id="blog">
      <h1>Blog</h1>
      <Row>
        {data.allMediumPost.edges.map(edge => {
          const { id, title, uniqueSlug, image } = edge.node;
          const { subtitle, tags } = edge.node.virtuals;
          return (
            <Col md={6} lg={6} key={id}>
              <PostCard
                title={title}
                summary={subtitle}
                image={image.childImageSharp.fluid}
                href={`https://medium.com/stories/${uniqueSlug}`}
              />
            </Col>
          );
        })}
      </Row>
    </section>
  );
};
