/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/postTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path) {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate,
          context: {}, // additional data can be passed via context
        });
      }
    });
  });
};

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  store,
  cache,
}) => {
  const { createNodeField, createNode } = actions;
  if (node.internal.type === 'MediumPost') {
    try {
      const fileNode = await createRemoteFileNode({
        url: `https://cdn-images-1.medium.com/${
          node.virtuals.previewImage.imageId
        }`,
        parentNodeId: node.id,
        store,
        cache,
        createNode,
        createNodeId,
      });

      node.image___NODE = fileNode.id;
      /*createNodeField({
        node,
        name: 'image___NODE',
        value: fileNode.id,
      });*/
    } catch (err) {
      console.log(err);
    }
  }
};
