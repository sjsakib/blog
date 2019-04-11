module.exports = {
  siteMetadata: {
    title: `Sharfin Jahan Sakib`,
    description:
      "Passionate programmer, full stack web developer. Also goes by the handle 'sjsakib' on many platforms.",
    author: `Sharfin Janhan Sakib`,

    rootUrl: `https://sakib.dev`,
    fbAppId: `328751384446361`
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: `।`,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
            },
          },
          {
            resolve: `gatsby-remark-emoji`,
            options: {
              ascii: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sharfin Jahan Sakib`,
        short_name: `Sakib`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `src/images/face-circle.png`,
      },
    },
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `@sjsakib`,
        limit: process.env.NODE_ENV === 'development' ? 2 : 500,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /src\/images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-90813960-7",
        head: true,
      },
    },
    /*{
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },*/
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
