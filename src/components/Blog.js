import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import PostCard from './PostCard';

export default function Posts({ perPage = 3, perRow = 3, showTags = 8 }) {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { type: { eq: "post" } } }) {
        edges {
          node {
            id
            frontmatter {
              path
              date(formatString: "X")
              dateString: date(formatString: "MMMM DD, YYYY")
              title
              subtitle
              tags
              mediumSlug
              image {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 2, transformOptions: {cropFocus: ATTENTION})
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
            detectedLanguage
            dateString: createdAt(formatString: "MMMM DD, YYYY")
            createdAt(formatString: "X")
            virtuals {
              subtitle
              tags {
                slug
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 2, transformOptions: {cropFocus: CENTER})
              }
            }
          }
        }
      }
    }
  `);
  const allTags = {};
  const mediumSlugs = []; // of posts that are also published on Medium
  let posts = data.allMdx.edges.map(edge => {
    const { id, frontmatter } = edge.node;
    let {
      date,
      dateString,
      title,
      subtitle,
      image,
      path,
      tags,
      mediumSlug,
    } = frontmatter;

    tags = tags || [];

    tags.forEach(t => {
      allTags[t] = allTags[t] + 1 || 1;
    });

    tags.push('sakib.dev');

    mediumSlug && mediumSlugs.push(mediumSlug);

    return {
      id,
      date,
      dateString,
      title,
      subtitle,
      tags,
      image: image && image.childImageSharp.gatsbyImageData,
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
          detectedLanguage,
        } = edge.node;
        let { subtitle, tags } = virtuals;

        tags = tags ? tags.map(t => t.slug) : [];

        tags.forEach(t => {
          allTags[t] = allTags[t] + 1 || 1;
        });

        tags.push('medium.com');
        detectedLanguage &&
          tags.push({ en: 'english', bn: 'bangla' }[detectedLanguage]);

        return {
          id,
          date: createdAt,
          dateString,
          title,
          subtitle,
          image: image && image.childImageSharp.gatsbyImageData,
          tags,
          href: 'https://medium.com/stories/' + uniqueSlug,
        };
      })
  );

  posts.sort((a, b) => b.date - a.date);

  return (
    <section id="blog">
      <h1>Blog</h1>
      <FilteredPosts
        posts={posts}
        tags={allTags}
        perRow={perRow}
        perPage={perPage}
        showTags={showTags}
        specialTags={['english', 'bangla', 'sakib.dev', 'medium.com']}
      />
    </section>
  );
}

const FilteredPosts = ({
  posts,
  tags,
  perRow,
  perPage = 10,
  showTags = 8,
  specialTags,
}) => {
  tags = Object.keys(tags)
    .filter(t => !specialTags.includes(t))
    .sort((a, b) => tags[b] - tags[a]);

  const [selected, setSelected] = useState({});
  const [tagsMore, setTagsMore] = useState(false);

  posts = posts.filter(post =>
    Object.keys(selected).every(t =>
      selected[t] ? post.tags.includes(t) : true
    )
  );

  const renderTags = (tags, x) =>
    tags.slice(0, x).map(t => (
      <button
        className={'tag ' + (selected[t] ? ' selected' : '')}
        key={t}
        onClick={() => {
          setSelected({ ...selected, [t]: !selected[t] });
        }}
      >
        {t}
      </button>
    ));

  return (
    <div>
      <div className="special-tags">
        {renderTags(specialTags, Number.MAX_VALUE)}
      </div>
      <div>{renderTags(tags, tagsMore ? tags.length : showTags)}</div>
      <button onClick={() => setTagsMore(!tagsMore)} className="tag">
        {tagsMore ? (
          <>
            <FaArrowUp /> Show Less
          </>
        ) : (
          <>
            <FaArrowDown /> Show {tags.length - showTags} more
          </>
        )}
      </button>
      <div className="space" />
      <Row>
        {posts.slice(0, Math.min(perPage, posts.length)).map(p => (
          <Col md={12 / perRow} key={p.id}>
            <PostCard {...p} />
          </Col>
        ))}
      </Row>
      {posts.length > perPage && (
        <>
          <div className="space" />
          <Link className="button more" to="/blog">
            More posts
          </Link>
        </>
      )}
    </div>
  );
};
