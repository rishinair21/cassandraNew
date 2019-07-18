import React, { useState } from 'react'
import Rodal from 'rodal'
import _ from 'lodash'
import 'rodal/lib/rodal.css'

import './style/featured-videos.scss'

function FeaturedVideos({ videoList }) {
    const [visibleVideoModal, setVisibleVideoModal] = useState(false)
    const [activeVideoURL, setActiveVideoURL] = useState('')

    const closeVideoModal = () => {
        setVisibleVideoModal(false)
    }

    const openVideoModal = (url, e) => {
        console.log(e, url)
        e.preventDefault()
        const videoSrc = `https://www.youtube.com/embed/${
            url.split('watch?v=')[1]
        }?autoplay=${1}&rel=${0}&modestbranding=${1}`
        setActiveVideoURL(videoSrc)
        setVisibleVideoModal(true)
    }

    return (
        <div className="featured-video-section">
            <div className="heading">Talks</div>
            {visibleVideoModal && (
                <Rodal width={700} visible={visibleVideoModal} onClose={closeVideoModal}>
                    <div style={{ height: '70vh !important' }}>
                        <div className="player-section">
                            <iframe
                                title="Player"
                                className="player"
                                type="text/html"
                                src={activeVideoURL}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    </div>
                </Rodal>
            )}

            <div className="video-card">
                {_.map(videoList, (value, key) => (
                    <div className="ca-card" key={key} onClick={openVideoModal.bind(this, value.url)}>
                        <div className="card-image" style={{ backgroundImage: `url(${value.preview_picture})` }}>
                            <div className="image-overlay">
                                <div className="play-btn">
                                    <img src="/images/youtube-btn.png" width="50" alt="play button" />
                                </div>
                            </div>
                        </div>
                        <div className="card-title">{value.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedVideos
