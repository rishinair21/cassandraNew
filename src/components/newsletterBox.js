import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Send, Mail, AlertCircle, CheckCircle } from 'react-feather'

import './style/newsletter-box.scss'

function NewsLetterBox() {
    const [email, setEmail] = useState('')
    const [newsletterWarningMsg, setNewsletterWarningMsg] = useState('')
    const [sendButtonMsg, setSendButtonMsg] = useState('Subscribe')
    const [newsletterSuccessMsg, setNewsletterSuccessMsg] = useState('')

    const _handleSubmit = async e => {
        e.preventDefault()
        // const result = await addToMailchimp(email)
        if (email === null || email.length === 0) {
            setNewsletterWarningMsg('please input your email')
        } else {
            setNewsletterWarningMsg('')
            setSendButtonMsg('Sending...')
            const res = await addToMailchimp(email)
            if (res.result === 'error') {
                setNewsletterSuccessMsg(`${email} is already subscribed to list.`)
                setSendButtonMsg('Subscribe')
            } else {
                setEmail('')
                setNewsletterSuccessMsg('Successfully Subscribed. Thanks!')
                setSendButtonMsg('Subscribe')
            }

            setTimeout(() => {
                setNewsletterSuccessMsg('')
                setEmail('')
            }, 4000)
        }
    }

    const emailHandle = e => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    return (
        <div className="newsletter-box">
            <div className="title">Subscribe</div>
            <div className="sub-title">
                Share your Email Address with us and get weekly stuffs related with cassandra
            </div>
            <Form onSubmit={_handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" value={email} onChange={emailHandle} placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Feed me good resources
                </Button>
                <div className="warning-msg">
                    {newsletterWarningMsg !== '' && <AlertCircle size={13} />} {newsletterWarningMsg}
                </div>
                <div className="warning-success">
                    {newsletterSuccessMsg !== '' && <CheckCircle size={13} />} {newsletterSuccessMsg}
                </div>
            </Form>
        </div>
    )
}

export default NewsLetterBox
