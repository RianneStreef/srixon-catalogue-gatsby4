require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "srixon-catalogue",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-E8M2GHGK52", "G-9YM7X9LBL5"],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
        // defaults to false
        enableWebVitalsTracking: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Srixon EU & Uk Catalogue",
        short_name: "Srixon",
        start_url: "/",
        background_color: "#bf2428",
        theme_color: "#FFFFFF",
        display: "fullscreen",
        icon: "./src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: ["/"],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.GATSBY_CONTENTFUL_TOKEN,
        spaceId: process.env.GATSBY_CONTENTFUL_ID,
        useNameForId: false,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.jsx`),
      },
    },
  ],
};
