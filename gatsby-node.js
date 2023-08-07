const path = require('path');
// const WorkerPlugin = require('worker-plugin');

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      // new WorkerPlugin(),
    ],
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/postTemplate.js`);
  const tagTemplate = path.resolve(`src/templates/tagTemplate.js`);

  return graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
            internal {
              contentFilePath
            }
          }
        }
      }
      allMediumPost {
        edges {
          node {
            virtuals {
              tags {
                slug
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const allTags = new Set();
    result.data.allMdx.edges.forEach(({ node }) => {
      const { tags } = node.frontmatter;
      tags?.forEach(t => allTags.add(t));

      if (node.frontmatter.path) {
        createPage({
          path: node.frontmatter.path,
          component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {}, // additional data can be passed via context
        });
      }
    });

    result.data.allMediumPost.edges.forEach(({ node }) => {
      const { tags } = node.virtuals;
      tags?.forEach(t => allTags.add(t.slug));
    });

    allTags.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagTemplate,
        context: { tag },
      });
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
        url: `https://miro.medium.com/v2/resize:fit:2400/${node.virtuals.previewImage.imageId}`,
        parentNodeId: node.id,
        store,
        cache,
        createNode,
        createNodeId,
      });

      node.image = fileNode.id;
    } catch (err) {
      console.log(err);
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MediumPost implements Node {
      image: File @link
    }
  `);
};
