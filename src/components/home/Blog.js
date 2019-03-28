import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      {
        allMediumPost(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              detectedLanguage
              creatorId
              medium_id
              title
              virtuals {
                subtitle
                previewImage {
                  imageId
                }
              }
              author {
                name
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data)
      return (
        <header>
          {data.allMediumPost.edges.map(edge => {
            const post = edge.node
            return (
              <div>
                <a
                  href={`https://medium.com/${post.creatorId}/${
                    post.medium_id
                  }`}
                  key={post.id}
                >
                  {post.title}
                </a>
              </div>
            )
          })}
        </header>
      )
    }}
  />
)
