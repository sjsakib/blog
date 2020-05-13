import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import PostCard from './PostCard';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { type: { eq: "project" } } }
        sort: { fields: [frontmatter___order], order: ASC }
        limit: 6
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
  const posts = data.allMdx.edges.map(edge => {
    const { title, subtitle, image, path, dateString } = edge.node.frontmatter;
    const { id } = edge.node;
    return (
      <Col lg={6} md={6} key={id}>
        <PostCard
          title={title}
          subtitle={subtitle}
          image={image && image.childImageSharp.fluid}
          href={path}
          dateString={dateString}
        />
      </Col>
    );
  });
  return (
    <section id="projects">
      <h1>Projects</h1>
      <div className="space" />
      <Row>{posts}</Row>
      <div className="space" />
      <Link className="button more" to="/projects">
        See more
      </Link>
    </section>
  );
};
