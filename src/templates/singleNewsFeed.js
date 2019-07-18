import React from 'react'
import { graphql } from 'gatsby'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import Markdown from 'markdown-to-jsx'

import Layout from '../components/layout'
import SEO from '../components/seo'
import FeaturedArticles from '../components/featuredArticles'
import NewsLetterBox from '../components/newsletterBox'

import './style/news-feed.scss'

function SingleNewFeedPage({ data }) {
    console.log(data)
    const singlePage = data.newsFeeds.edges[0].node
    return (
        <Layout>
            <SEO title="Cassandra Links | Anant Corporation Project" />
            <Container>
                <div className="feed-section">
                    <Row>
                        <Col>
                            <div className="title">{singlePage.title}</div>
                            <div className="content">
                                <Markdown>{singlePage.content}</Markdown>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    )
}

export default SingleNewFeedPage

export const pageQuery = graphql`
    query SingleNewFeedQuery($obj_id: String) {
        newsFeeds: allFeedTtrs(filter: { id: { eq: $obj_id } }) {
            edges {
                node {
                    link
                    title
                    pubDate
                    id
                    author
                    content
                }
            }
        }
    }
`
