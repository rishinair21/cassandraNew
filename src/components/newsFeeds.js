import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'
import { User } from 'react-feather'
import moment from 'moment'

import './style/news-feed-card.scss'

function NewsFeeds({ newsFeeds, fontSize }) {
    return (
        <div className="newsfeed-section">
            {_.map(newsFeeds, (value, key) => (
                <div key={key} className="news-feed-card">
                    <div className="card-head">
                        <div className="title" style={{ fontSize }}>
                            <Link to={`/feed/${value.id}`}>{value.title.slice(0, 70)}</Link>
                        </div>
                        <div className="published-date">{moment(value.pubDate).fromNow()}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NewsFeeds
