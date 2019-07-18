import React from 'react'
import { graphql } from 'gatsby'
import { Container, Alert, Row, Col } from 'react-bootstrap'

import Layout from '../components/layout'
import SEO from '../components/seo'
import NewsFeeds from '../components/newsFeeds'
import NewsLetterBox from '../components/newsletterBox'
import Contributor from '../components/contribute'
import Pagination from '../components/pagination'

function NewsFeedPage({ data, pageContext }) {
    console.log(data)
    const newsFeeds = data.newsFeeds.nodes
    return (
        <Layout>
            <SEO title="Cassandra Links | Anant Corporation Project" />
            <Container>
                <Row>
                    <Col>
                        <NewsFeeds fontSize="25px" newsFeeds={newsFeeds} />
                        <Pagination {...pageContext} />
                    </Col>
                    <Col md="4">
                        <NewsLetterBox />
                        <Contributor />
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default NewsFeedPage

export const pageQuery = graphql`
    query NewsFeedQuery($skip: Int, $limit: Int) {
        newsFeeds: allFeedTtrs(skip: $skip, limit: $limit) {
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
