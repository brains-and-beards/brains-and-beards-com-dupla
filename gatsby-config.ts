import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Home",
    titleTemplate: "%s · Brains & Beards",
    description:
      "Brains & Beards is an unpretentious mobile studio that solves business problems through a mix of design and technology.",
    siteUrl: "https://brainsandbeards.com",
    url: "https://brainsandbeards.com",
    // No trailing slash allowed!
    image: "favicon.png",
    // Path to your image you placed in the 'static' folder
    twitterUsername: "@brainsandbeards",
    blogPostsCountPerPage: 12,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
        },
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          omitKeys: [
            "xmlnsDc",
            "xmlnsCc",
            "xmlnsRdf",
            "xmlnsSvg",
            "xmlnsSodipodi",
            "xmlnsInkscape",
            "rdfAbout",
            "rdfResource",
          ],
        },
      },
    },
  ],
};

export default config;
