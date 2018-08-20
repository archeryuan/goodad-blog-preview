module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: `ldcsjhfffdjn`,
        accessToken: `5fc70819c4778cff69492e3d9443e82823e530fe4f5f559e552942dc17fcd2d3`,
        host: 'preview.contentful.com'
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`
  ],
}
