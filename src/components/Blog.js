import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaEllipsisH } from 'react-icons/fa';

import PostCard from './PostCard';

export default ({ perPage = 9 }) => {
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

  return (
    <section id="blog">
      <h1>Blog</h1>
      <FilteredPosts
        posts={posts}
        tags={allTags}
        perRow={3}
        perPage={perPage}
      />
    </section>
  );
};

const FilteredPosts = ({
  posts,
  tags,
  perRow,
  perPage = 10,
  showTags = 10,
}) => {
  tags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  const [selected, setSelected] = useState({});
  const [tagsMore, setTagsMore] = useState(false);

  return (
    <div>
      <div>
        {tags.slice(0, tagsMore ? tags.length : showTags).map(t => (
          <span
            className={'tag ' + (selected[t] ? ' selected' : '')}
            key={t}
            onClick={() => {
              setSelected({ ...selected, [t]: !selected[t] });
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <span onClick={() => setTagsMore(!tagsMore)} className="tag">
        {tagsMore ? (
          <>
            <FaArrowUp /> Show Less
          </>
        ) : (
          <>
            <FaArrowDown /> {`Show ${tags.length - showTags} more`}
          </>
        )}
      </span>
      <Row>
        {posts
          .slice(0, Math.min(perPage, posts.length))
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
      {posts.length > perPage && (
        <Link title="See More" className="card-link" to="/blog">
          <FaEllipsisH size={'3rem'} />
          <h4>More</h4>
        </Link>
      )}
    </div>
  );
};
