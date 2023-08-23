import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import PostCard from './PostCard';

export default function Projects() {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { type: { eq: "project" } } }
        sort: { frontmatter: {order: ASC} }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              subtitle
              tags
              dateString: date(formatString: "MMMM, YYYY")
              image {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 2)
                }
              }
            }
            excerpt
          }
        }
      }
    }
  `);
  const posts = data.allMdx.edges.map(edge => {
    const { title, subtitle, image, path, dateString } = edge.node.frontmatter;
    const { id } = edge.node;
    return (
      <Col lg={6} md={6} key={id}>
        <PostCard
          title={title}
          subtitle={subtitle}
          image={image?.childImageSharp.gatsbyImageData}
          href={path}
          dateString={dateString}
        />
      </Col>
    );
  });
  return (
    <section id="projects">
      <h1>Some Pet Projects</h1>
      <div className="space" />
      <Row>{posts}</Row>
    </section>
  );
};
