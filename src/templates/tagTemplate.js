import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/PostCard';
import '../components/styles/post.scss';

export default props => {
  const { data } = props;
  const tag = props.pageContext.tag;

  const mediumSlugs = [];

  let posts = data.allMarkdownRemark.edges.map(edge => {
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
      image: image && image.childImageSharp.fluid,
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
  const title = 'Tag: ' + tag;
  return (
    <Layout>
      <SEO title={title} description={'All posts tagged: ' + tag} />
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
};

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
              fluid(maxHeight: 500, maxWidth: 1000, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
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
                fluid(maxHeight: 500, maxWidth: 1000, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
