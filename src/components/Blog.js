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
      <Row>
        {data.allMediumPost.edges.map(edge => {
          const { id, title, uniqueSlg, image } = edge.node;
          const { subtitle, tags } = edge.node.virtuals;
          return (
            <Col key={id}>
              <PostCard
                title={title}
                summary={subtitle}
                image={image.childImageSharp.fluid}
                href={`https://medium.com/${uniqueSlg}`}
              />
            </Col>
          );
        })}
      </Row>
    </section>
  );
};
