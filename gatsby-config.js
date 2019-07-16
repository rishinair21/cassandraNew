module.exports = {
    siteMetadata: {
        title: `Cassandra.Link`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Poppins`,
                        variants: [`400`, `500`, `700`],
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                // Type prefix of entities from server
                typePrefix: 'cassandra__',

                // The url, this should be the endpoint you are attempting to pull data from
                url: `http://admin.stage.leaves.anant.us/api/entries?access_token=N2Y1YmFlNzY4OTM3ZjE2OGMwODExODQ1ZDhiYmQ5OWYzMjhkZjhiMDgzZWU2Y2YyYzNkYzA5MDQ2NWRhNDIxYw&limit=10&order=desc&page=2&sort=created&tags=cassandra&perPage=200`,

                method: 'get',

                headers: {
                    'Content-Type': 'application/json',
                },

                data: {},

                name: 'links',

                entityLevel: `_embedded.items`,

                localSave: true,

                path: `${__dirname}/db/`,

                verboseOutput: true,
            },
        },
        {
            resolve: `gatsby-source-rss-feed`,
            options: {
                url: `http://192.241.141.6:81/public.php?op=rss&id=-4&limit=500&key=k7ojwf5bd4b2e7638ff`,
                name: `TTRS`,
                // Optional
                // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
                parserOption: {
                    customFields: {
                        item: ['entry:summary'],
                    },
                },
            },
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint:
                    'https://anant.us1.list-manage.com/subscribe/post?u=d92549071121954997db2d1e1&amp;id=6f48ff83dd', // add your MC list endpoint here; see instructions below
            },
        },
    ],
}
