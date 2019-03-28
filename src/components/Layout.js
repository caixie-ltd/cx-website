import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import * as Sentry from '@sentry/browser'
import { Modal } from '@dawnlabs/tacklebox'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

import { breakpoints } from '../components/styled/theme'
import { theme, Box, Link, Column } from '../components/styled'
import Nav from '../components/styled/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

import favicon from '../static/favicon.ico'

Sentry.init({
  dsn: process.env.GATSBY_SENTRY_DSN
})

const GlobalStyle = createGlobalStyle`
*, *:before, *:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

::selection {
  background: black;
  color: white;
}

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  min-width: 320px;
}

html {
  font-size: ${(12 / 16) * 100}%;

  @media (min-width: ${breakpoints[0]}) {
    font-size: ${(12 / 16) * 100}%;
  }

  @media (min-width: ${breakpoints[1]}) {
    font-size: 80%;
  }

  @media (min-width: ${breakpoints[2]}) {
    font-size: 90%;
  }

  @media (min-width: ${breakpoints[3]}) {
    font-size: 100%;
  }
}

body {
  -webkit-overflow-scrolling: touch;
  background: white;
}

ul {
  padding: 0;
  margin: 0;
}

${
  '' /* a:focus, input:focus, button:focus, textarea:focus {
  outline-color: #FDAD2A;
} */
  }

input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
}
`

const Wrapper = styled(Column)`
  align-items: center;
`

const Container = styled(Box)`
  width: 100%;
  max-width: 85rem;
  margin: 3.5rem auto;
`

const AnimationWrapper = styled(Box)`
  background: white;
  color: black;
  position: fixed;
  z-index: 100;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  transform-origin: left bottom;
  transition: all 400ms ease-in-out;
  transform: translateY(${props => (props.open ? '0' : '5000')}px);
  @media screen and (prefers-reduced-motion) {
    transition: none;
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: this.props.location.pathname.startsWith('/contact')
    }

    this.openContactModal = () => {
      this.setState({ open: true })
      this.context.mixpanel.track('contact form: opened')
    }
    this.closeContactModal = () => this.setState({ open: false })
  }

  /*eslint-disable */
  componentDidMount() {
    console.log(
      `%c
          ___                         __       _
         /   \\__ ___      ___ __     / /  __ _| |__  ___
        / /\\ / _\` \\ \\ /\\ / / '_ \\   / /  / _\` | '_ \\/ __|
       / /_// (_| |\  V  V /| | | | / /__| (_| | |_)  \__ \\
      /___,' \\__,_| \\_/\\_/ |_| |_| \\____/\\__,_|_.__/|___/

      %c----------------------------------------------------

      %cWelcome, have a look around!

      -------------------------------------------------------------------
      | %cFrameworks:             %cReact, Gatsby                           |
      |-----------------------------------------------------------------|
      | %cDesigned With:          %cFigma                                   |
      |-----------------------------------------------------------------|
      | %cDeployed with:          %cNetlify                                 |
      |-----------------------------------------------------------------|
      | %cBuilt on:               %cMacBook Pro 15" (Mac OS High Sierra)    |
      |-----------------------------------------------------------------|
      | %cBuilt from:             %cMission District, SF & Bed Stuy, NY     |
      |-----------------------------------------------------------------|
      | %cCaffeine provided by:   %cFour Barrel & Oslo Coffee Roasters      |
      -------------------------------------------------------------------

      In case you're interested, we're hiring... (https://dawnlabs.io/jobs)

    `,
      'color: #8D65F2;',
      'color: #FDAD2A;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;',
      'color: #8D65F2;',
      'color: gray;'
    )
  }
  /*eslint-enable */

  render() {
    const { children, hasContactSection } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Helmet
            title="dawn"
            meta={[
              {
                name: 'viewport',
                content:
                  'width=device-width, initial-scale=1.0, maximum-scale=5'
              },
              {
                name: 'description',
                content:
                  'With a holistic approach to engineering and design, Dawn partners with startups and enterprises to build for the digital era.'
              },
              { name: 'twitter:card', content: 'summary' },
              { name: 'twitter:site', content: '@dawn_labs' },
              {
                name: 'twitter:title',
                content: 'Dawn Labs — Thoughtful products for inspired teams'
              },
              {
                name: 'twitter:description',
                content:
                  'With a holistic approach to engineering and design, Dawn partners with startups and enterprises to build for the digital era.'
              },
              {
                name: 'twitter:image',
                content:
                  'https://pbs.twimg.com/profile_images/822962384843083776/4wZLZe2Y_400x400.jpg'
              }
            ]}
          >
            <link rel="icon" href={favicon} type="image/x-icon" />
            <html lang="en" />
          </Helmet>
          <GlobalStyle />
          <SkipNavLink />
          <Container px={['1.5rem', '5rem']}>
            <Nav>
              <Header>dawn</Header>
              <Box>
                <Link nav={true} to="/work">
                  Work
                </Link>
                <Link nav={true} ml={[6, 7]} to="/about">
                  About
                </Link>
                <Link ml={[6, 7]} onClick={this.openContactModal}>
                  Contact
                </Link>
              </Box>
            </Nav>
            <SkipNavContent />
            {children}
          </Container>
          <Footer
            hasContactSection={hasContactSection}
            openContactModal={this.openContactModal}
          />
          <Modal open={true} onClickAway={this.closeContactModal}>
            <AnimationWrapper open={this.state.open}>
              <ContactModal
                open={this.state.open}
                close={this.closeContactModal}
              />
            </AnimationWrapper>
          </Modal>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

// use deprecated context API that mixpanel plugin requires
Layout.contextTypes = {
  mixpanel: PropTypes.object.isRequired
}

export default Layout
