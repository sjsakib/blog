module.exports = {
  siteMetadata: {
    title: `Sharfin Jahan Sakib`,
    description:
      "Senior full stack engineer with 4+ years of professional experience. A problem solver, an aspiring athlete and a lifelong learner",
    author: `Sharfin Jahan Sakib`,

    rootUrl: `https://sakib.dev`,
    fbAppId: `328751384446361`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        mergeStyleHashes: false,
        mergeScriptHashes: false,
        directives: {
          'style-src': `'self' 'unsafe-inline' https://fonts.googleapis.com`,
          'font-src': `'self' https://fonts.gstatic.com`,
          'script-src': `'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com`,
          'connect-src': `'self' https://www.google-analytics.com`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
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
              maxWidth: 1035,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-emoji`,
            options: {
              ascii: true,
              emojiConversion: 'shortnameToUnicode',
            },
          },
          `gatsby-plugin-catch-links`,
          `gatsby-remark-external-links`,
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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sharfin Jahan Sakib`,
        short_name: `Sakib`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
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
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://www.google-analytics.com'],
      },
    },
    'gatsby-plugin-webpack-bundle-analyser-v2',
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
