import React from 'react'
import { graphql } from 'gatsby'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import Markdown from 'markdown-to-jsx'

import Layout from '../components/layout'
import SEO from '../components/seo'
import FeaturedArticles from '../components/featuredArticles'
import NewsLetterBox from '../components/newsletterBox'

import './style/resource-single.scss'

function ResourcesSinglePage({ data }) {
    console.log(data)
    const singlePage = data.wallabagList.edges[0].node
    return (
        <Layout>
            <SEO title="Cassandra Links | Anant Corporation Project" />
            <Container>
                <div className="post-header">
                    <Row>
                        <Col
                            className="featured-image"
                            md="6"
                            style={{
                                backgroundImage: `url(${
                                    singlePage.preview_picture !== null
                                        ? singlePage.preview_picture
                                        : `https://screenshot-v2.now.sh/${singlePage.url}`
                                })`,
                            }}
                        ></Col>
                        <Col md="6" className="post-meta-data">
                            <div className="title">{singlePage.title}</div>
                            <div className="post-meta">
                                <ul>
                                    {/* <li>{singlePage.domain_name}</li> */}
                                    <li>5 min</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="post-content">
                    <div className="content-section">
                        <Markdown>{singlePage.content}</Markdown>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default ResourcesSinglePage

export const pageQuery = graphql`
    query ResourcesSingleQuery($obj_id: String) {
        wallabagList: allCassandraLinks(filter: { id: { eq: $obj_id } }) {
            edges {
                node {
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
                    content
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
    }
`
