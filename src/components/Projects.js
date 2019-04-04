import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import PostCard from './PostCard';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "project" } } }
        sort: { fields: [frontmatter___order], order: ASC }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              subtitle
              tags
              image {
                childImageSharp {
                  fluid(maxHeight: 500, maxWidth: 1000, cropFocus: ATTENTION) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt
          }
        }
      }
    }
  `);
  const posts = data.allMarkdownRemark.edges.map(edge => {
    const { title, subtitle, image, path } = edge.node.frontmatter;
    const {id}  = edge.node;
    return (
      <Col lg={6} md={6} key={id}>
        <PostCard
          title={title}
          subtitle={subtitle}
          image={image.childImageSharp.fluid}
          href={path}
        />
      </Col>
    );
  });
  return (
    <section id="projects">
      <h1>Projects</h1>
      <Row>{posts}</Row>
    </section>
  );
};
