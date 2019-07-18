import React from 'react'
import { graphql, Link } from 'gatsby'
import { Container, Alert, Row, Col } from 'react-bootstrap'

import Layout from '../components/layout'
import SEO from '../components/seo'
import HeroSearch from '../components/heroSearch'
import FeaturedVideos from '../components/featuredVideos'
import FeaturedArticles from '../components/featuredArticles'
import FeaturedRepo from '../components/featuredRepo'
import NewsLetterBox from '../components/newsletterBox'
import Contributor from '../components/contribute'
import NewsFeeds from '../components/newsFeeds'

function IndexPage({ data }) {
    const videoList = data.videoList.nodes
    const wallabagList = data.wallabagList.nodes
    const openSourceList = data.openSourceList.nodes
    const newsFeeds = data.newsFeeds.nodes
    return (
        <Layout>
            <SEO title="Cassandra Links | Anant Corporation Project" />
            <Container>
                <HeroSearch />
                <Row>
                    <Col md="3" className="newsfeed-home">
                        <div className="heading">News Feeds</div>
                        <NewsFeeds fontSize="16px" newsFeeds={newsFeeds} />
                        <div className="view-more">
                            <Link to="/news-feed/page/1">View More News Feeds</Link>
                        </div>
                        <br />
                        <FeaturedVideos videoList={videoList} />
                    </Col>
                    <Col>
                        <FeaturedArticles wallabagList={wallabagList} />

                        <div className="load-more-resources">
                            <Link to="/resources/page/2">
                                <span>View More Articles</span>
                            </Link>
                        </div>
                    </Col>
                    <Col md="3">
                        <NewsLetterBox />
                        <FeaturedRepo openSourceList={openSourceList} />
                        <Contributor />
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query IndexQuery {
        wallabagList: allCassandraLinks(
            filter: { domain_name: { ne: "github.com" }, content: { ne: null } }
            sort: { fields: created_at, order: DESC }
            limit: 18
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
                title
                url
                id
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
        videoList: allCassandraLinks(
            filter: { domain_name: { regex: "/youtube/" }, content: { ne: null } }
            sort: { fields: created_at, order: DESC }
            limit: 6
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
        openSourceList: allCassandraLinks(
            filter: { domain_name: { regex: "/github.com/" }, content: { ne: null } }
            sort: { fields: created_at, order: DESC }
            limit: 12
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

        newsFeeds: allFeedTtrs(limit: 6) {
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
