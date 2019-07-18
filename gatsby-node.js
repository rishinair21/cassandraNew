const path = require('path')
const _ = require('lodash')

const PAGE_SIZE = 18

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    const resourcesTemplate = path.resolve(`src/templates/resourcesTemplate.js`)
    const resourceSinglePage = path.resolve(`src/templates/resourceSinglePage.js`)
    const newsFeedTemplate = path.resolve(`src/templates/newsFeedTemplate.js`)
    const singleNewsFeed = path.resolve(`src/templates/singleNewsFeed.js`)

    return new Promise((resolve, reject) => {
        resolve(
            graphql(
                `
                    query {
                        wallabagList: allCassandraLinks(
                            sort: { fields: created_at, order: DESC }
                            filter: {
                                domain_name: { ne: "github.com" }
                                content: { ne: null }
                                alternative_id: { ne: null }
                            }
                        ) {
                            nodes {
                                is_archived
                                is_starred
                                user_name
                                user_email
                                user_id
                                is_public
                                alternative_id
                                uid
                                id
                                title
                                url
                                created_at
                                updated_at
                                published_at
                                mimetype
                                language
                                reading_time
                                domain_name
                                preview_picture
                                tags {
                                    label
                                    slug
                                    alternative_id
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                // Break the entries into chunks according to
                const chunks = _.chunk(result.data.wallabagList.nodes, PAGE_SIZE)
                const TOTAL_OBJECT = result.data.wallabagList.nodes.length
                chunks.forEach((chunk, index) => {
                    createPage({
                        path: `resources/page/${index + 1}`,
                        component: resourcesTemplate,
                        context: {
                            first: PAGE_SIZE / 2,
                            skip: PAGE_SIZE * index,
                            limit: PAGE_SIZE,
                            catId: chunk.cat_id,
                            pageNumber: index + 1,
                            hasNextPage: index !== chunks.length - 1,
                            hasPreviousPage: index !== 0,
                            linkSchema: `/resources/page`,
                            nextPageLink: `/resources/page/${index + 2}`,
                            previousPageLink: `/resources/page/${index}`,
                            total: TOTAL_OBJECT,
                        },
                    })
                })

                result.data.wallabagList.nodes.forEach(x => {
                    // loop over split pages
                    createPage({
                        path: `/post/${x.id}`,
                        component: resourceSinglePage,
                        context: {
                            obj_id: x.id,
                        },
                    })
                })
            }),
            graphql(
                `
                    query {
                        newsFeeds: allFeedTtrs {
                            nodes {
                                link
                                title
                                pubDate
                                id
                                author
                            }
                        }
                    }
                `
            ).then(result => {
                // Break the entries into chunks according to
                const chunks = _.chunk(result.data.newsFeeds.nodes, PAGE_SIZE)
                const TOTAL_OBJECT = result.data.newsFeeds.nodes.length
                chunks.forEach((chunk, index) => {
                    createPage({
                        path: `news-feed/page/${index + 1}`,
                        component: newsFeedTemplate,
                        context: {
                            first: PAGE_SIZE / 2,
                            skip: PAGE_SIZE * index,
                            limit: PAGE_SIZE,
                            catId: chunk.cat_id,
                            pageNumber: index + 1,
                            hasNextPage: index !== chunks.length - 1,
                            hasPreviousPage: index !== 0,
                            linkSchema: `/news-feed/page`,
                            nextPageLink: `/news-feed/page/${index + 2}`,
                            previousPageLink: `/news-feed/page/${index}`,
                            total: TOTAL_OBJECT,
                        },
                    })
                })

                result.data.newsFeeds.nodes.forEach(x => {
                    // loop over split pages
                    createPage({
                        path: `/feed/${x.id}`,
                        component: singleNewsFeed,
                        context: {
                            obj_id: x.id,
                        },
                    })
                })
            })
        )
    })
}
