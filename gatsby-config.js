module.exports = {
    siteMetadata: {
        title: `Alec Aivazis`,
        description: 'A freelance software engineer',
        author: `@AlecAivazis`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-remark-reading-time',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/posts`,
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-prismjs',
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 700,
                            linkImagesToOriginal: false,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Alec Aivazis`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        'gatsby-plugin-offline',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-svg',
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: './src/images/favicon.png',
            },
        },
    ],
}
