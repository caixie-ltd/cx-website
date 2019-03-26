import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { CopyButton } from '@dawnlabs/tacklebox'
import * as Sentry from '@sentry/browser'

import { Box, Row, Column, Text, Link, Heading, Button } from './styled'

const STATUS = {
  unsubmitted: 'unsubmitted',
  loading: 'loading',
  success: 'success',
  failed: 'failed'
}

const encode = data => {
  return Object.keys(data)
    .filter(
      key => ['form-name', 'fullname', 'email', 'message'].indexOf(key) > -1
    )
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Input = styled.input`
  background: none;
  outline: none;
  border: 1px solid black;
  padding: 1rem 1.5rem;
  font-size: ${themeGet('fontSizes.3')};
  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-width: 2px;
  }
`

const TextArea = styled.textarea`
  background: none;
  outline: none;
  line-height: 1.4;
  border: 1px solid black;
  padding: 1rem 1.5rem;
  font-size: ${themeGet('fontSizes.3')};
  font-family: ${themeGet('fonts.sans')};

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-width: 2px;
  }

  &:invalid {
    box-shadow: none;
  }

  width: 100%;
  resize: none;
`

const SubmitButton = styled(Button)`
  background: #fff;
  color: ${themeGet('colors.blueLink')};
  border-color: ${themeGet('colors.blueLink')};

  &:hover {
    color: white;
    border-color: ${themeGet('colors.blueLink')};
    background: ${themeGet('colors.blueLink')};
  }
`

class ContactModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: STATUS.unsubmitted
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.form = React.createRef()
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({ status: STATUS.loading })

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact:prod', ...this.state })
    })
      .then(() => {
        this.setState({ status: STATUS.success })
        this.context.mixpanel.track('contact form: submitted')
      })
      .catch(err => {
        this.setState({ status: STATUS.failed })
        Sentry.captureException(err, { formState: this.state })
      })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const isSafari =
      typeof navigator !== 'undefined' &&
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1

    const placeholder = isSafari
      ? "Things you could talk about: your project (idea, timeline, budget), joining our team, meeting for coffee, or whatever's on your mind"
      : `Things you could talk about:

- Your project (idea, timeline, budget)
- Joining our team
- Meeting for coffee
- Whatever's on your mind
`
    return (
      <Column
        position="relative"
        height="100%"
        justifyContent="center"
        alignItems="center"
        px={['1.5rem', 5]}
      >
        {this.props.open && <style>{`body { overflow: hidden; }`}</style>}
        <Box position="fixed" top="2rem" right="2.5rem">
          <Link border={0} onClick={this.props.close}>
            <Text fontSize={4} fontWeight="bold">
              &#10005;
            </Text>
          </Link>
        </Box>
        {this.state.status === STATUS.success ? (
          <Row width="100%" px={[0, 6]} maxWidth="37.75rem">
            <Column justifyContent="center">
              <Heading.h1 fontSize={['2.25rem', 6]} mb={5}>
                Thanks for the message 👌
              </Heading.h1>
              <Text.subheader mb={7}>
                We&#39;ll be in touch soon!
              </Text.subheader>
              <Button
                onClick={this.props.close}
                color="blue"
                borderColor="blue"
                maxWidth="10rem"
              >
                Return <span style={{ fontSize: '0.8em' }}>⮐</span>
              </Button>
            </Column>
          </Row>
        ) : (
          <React.Fragment>
            <Row>
              <Heading.h1 lineHeight="2.25rem" mb={7}>
                Let’s chat 👋
              </Heading.h1>
            </Row>
            <Row width="100%" justifyContent="center">
              <Column css={{ width: '100%', maxWidth: '37.75rem' }}>
                <Box mb={7}>
                  <Text
                    display="block"
                    fontSize="1.375rem"
                    lineHeight={1.5}
                    textAlign="center"
                  >
                    If you don’t feel like filling out a form, you can always
                    shoot us an email{' '}
                    <CopyButton text="hi@dawnlabs.io">
                      {({ onClick, copied }) => (
                        <Link
                          onClick={onClick}
                          fontSize="1.375rem"
                          underline="true"
                        >
                          {copied && (
                            <Box
                              top="2rem"
                              left="2rem"
                              bottom={0}
                              color="green"
                              fontSize={1}
                              position="absolute"
                            >
                              Copied!
                            </Box>
                          )}
                          hi@dawnlabs.io
                        </Link>
                      )}
                    </CopyButton>{' '}
                    or direct message{' '}
                    <Link
                      fontSize="1.375rem"
                      underline="true"
                      href="https://twitter.com/dawn_labs"
                    >
                      @dawn_labs
                    </Link>
                  </Text>
                </Box>
                <form
                  name="contact:prod"
                  ref={this.form}
                  onSubmit={this.handleSubmit}
                  netlify="true"
                  netlify-honeypot="bot-field"
                >
                  <p hidden={true}>
                    <label>
                      Don’t fill this out if you&#39;re human:
                      <input name="bot-field" />
                    </label>
                  </p>
                  <Row mb={5} justifyContent="space-between">
                    <Column width="48%">
                      <Input
                        height="2.5rem"
                        title="Full Name Input"
                        name="fullname"
                        required={true}
                        placeholder="Name"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Column>
                    <Column width="48%">
                      <Input
                        title="Email Input"
                        name="email"
                        required={true}
                        placeholder="Email"
                        type="email"
                        onChange={this.handleChange}
                      />
                    </Column>
                  </Row>
                  <Row mb={6}>
                    <TextArea
                      title="Your Message Goes Here"
                      name="message"
                      required={true}
                      rows="8"
                      onChange={this.handleChange}
                      placeholder={placeholder}
                    />
                  </Row>
                  <Row>
                    <SubmitButton
                      width="100%"
                      title="Submit contact form"
                      type="submit"
                      border={2}
                      fontSize={3}
                    >
                      Send Message
                    </SubmitButton>
                  </Row>
                </form>
              </Column>
            </Row>
          </React.Fragment>
        )}
      </Column>
    )
  }
}

// use deprecated context API that mixpanel plugin requires
ContactModal.contextTypes = {
  mixpanel: PropTypes.object.isRequired
}

export default ContactModal
