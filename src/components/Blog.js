import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Col } from 'react-bootstrap';

import PostCard from './PostCard';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } }) {
        edges {
          node {
            id
            frontmatter {
              path
              date(formatString: "X")
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
          }
        }
      }
      allMediumPost {
        edges {
          node {
            id
            title
            uniqueSlug
            createdAt(formatString: "X")
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
  const allTags = {};
  let posts = data.allMarkdownRemark.edges.map(edge => {
    const { id, frontmatter } = edge.node;
    const { date, title, subtitle, image, path, tags } = frontmatter;

    tags &&
      tags.forEach(t => {
        allTags[t] = allTags[t] + 1 || 1;
      });

    return {
      id,
      date,
      title,
      subtitle,
      tags: tags || [],
      image: image && image.childImageSharp.fluid,
      href: path,
    };
  });

  posts = posts.concat(
    data.allMediumPost.edges.map(edge => {
      const { id, createdAt, title, image, uniqueSlug, virtuals } = edge.node;
      const { subtitle, tags } = virtuals;

      tags &&
        tags.forEach(t => {
          allTags[t.slug] = allTags[t.slug] + 1 || 1;
        });

      return {
        id,
        date: createdAt,
        title,
        subtitle,
        image: image && image.childImageSharp.fluid,
        tags: tags ? tags.map(t => t.slug) : [],
        href: 'https://medium.com/stories/' + uniqueSlug,
      };
    })
  );
  console.log(allTags, posts);

  return (
    <section id="blog">
      <h1>Blog</h1>
      <FilteredPosts posts={posts} tags={allTags} perRow={3} />
    </section>
  );
};

const FilteredPosts = ({ posts, tags, perRow }) => {
  tags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  const [selected, setSelected] = useState({});

  return (
    <div>
      <div>
        {tags.map(t => (
          <span
            className={'tag ' + (selected[t] ? ' selected' : '')}
            key={t}
            onClick={() => {
              setSelected({ ...selected, [t]: !selected[t] || undefined });
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <Row>
        {posts
          .filter(post =>
            Object.keys(selected).reduce(
              (prev, t) => (selected[t] ? prev && post.tags.includes(t) : prev),
              true
            )
          ) // Is this crazy?
          .map(p => (
            <Col md={12 / perRow} key={p.id}>
              <PostCard {...p} />
            </Col>
          ))}
      </Row>
    </div>
  );
};
