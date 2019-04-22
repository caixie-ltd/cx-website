import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import ScrollLabel from '../components/scrollLabel/scrollLabel.jsx'

import './layout.css'
import { BrowserView } from 'react-device-detect'
import { withPrefix } from 'gatsby'

const mainStyle = {
  width: '100%',
  boxSizing: 'border-box',
}

const Layout = React.forwardRef((props, ref) => (
  <div>
    <Helmet>
      <html lang="en" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={withPrefix('/apple-touch-icon.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix('/favicon-32x32.png')}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix('/favicon-16x16.png')}
      />
      <link rel="manifest" href={withPrefix('/site.webmanifest')} />
      <link
        rel="mask-icon"
        href={withPrefix('/safari-pinned-tab.svg')}
        color="#f84525"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

    </Helmet>

    <noscript>
    </noscript>
    <main style={mainStyle} ref={ref} className={props.theme}>
      {props.children}
      <BrowserView>
        <ScrollLabel theme={props.theme} visible={props.scrollLabelVisible} />
      </BrowserView>
    </main>

  </div>
))

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
    showHomepageLoading: state.showHomepageLoading,
    scrollLabelVisible: state.scrollLabelVisible,
  }
}

const ConnectedLayout = connect(
  mapStateToProps,
  null
)(Layout)

export default ConnectedLayout
