/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = function onCreateNode({ actions, node, getNode }) {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
    })

    actions.createNodeField({
      name: "slug",
      value: "slug",
      node,
    })
  }

  exports.createPages = async function createPages({ actions, graphql }) {
    const { data, errors } = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    if (errors) {
      return Promise.reject(errors)
    }

    const mdTemplate = path.resolve("src/templates/insight.jsx")

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug } = node.fields
      actions.createPage({
        path: slug, // /en/content-us, /zh/content-us, etc.
        component: mdTemplate,
        content: {
          slug
        }
      })
    })

  }
}
