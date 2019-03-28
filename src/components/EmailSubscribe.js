import React from 'react'
import PropTypes from 'prop-types'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import * as EmailValidator from 'email-validator'
import * as Sentry from '@sentry/browser'

const INVALID_EMAIL_SLUG = 'The domain portion of the email address is invalid'

import TextSubmit from './TextSubmit'

const EmailSubscribe = (props, context) => (
  <MailchimpSubscribe
    url={process.env.GATSBY_MAILCHIMP_URL}
    render={props => {
      let { status, message, subscribe } = props

      if (status === 'error') {
        Sentry.captureException(new Error(message))

        // replace ugly error with a nice one
        if (message.indexOf && message.indexOf(INVALID_EMAIL_SLUG) > -1) {
          message = `Oh no, that's not a valid email!`
        }

        if (message.indexOf && message.indexOf('is already subscribed')) {
          // cut off 'Click to subscribe link'
          message = message.split('<a')[0]
        }
      }

      const wrappedSubscribe = EMAIL => {
        subscribe({ EMAIL })
        context.mixpanel.track('email list form: submitted', { email: EMAIL })
      }

      return (
        <TextSubmit
          status={status}
          onSubmit={wrappedSubscribe}
          isValid={EmailValidator.validate}
          placeholder="Email address"
          submitText="Subscribe"
          loadingText="Loading"
          errorText={message || 'Oops! Something went wrong.'}
          successText="Awesome! Check your email."
        />
      )
    }}
  />
)

// use deprecated context API that mixpanel plugin requires
EmailSubscribe.contextTypes = {
  mixpanel: PropTypes.object.isRequired
}

export default EmailSubscribe
