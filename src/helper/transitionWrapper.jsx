import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
// import Header from '../components/header/header.jsx'
import Cursor from '../components/mouse/cursor.jsx'
import { Provider } from 'react-redux'
import createStore from '../state/createStore.jsx'

import { BrowserView } from 'react-device-detect'
import Expanders from "../components/expanders/expanders"
import Navigation from "../components/expanders/navigation/navigation"

const store = createStore()

const TransitionWrapper = ({ children, location }) => {
  const RoutesContainer = posed.div({
    enter: {
      opacity: 1,
      y: 0,
      beforeChildren: true,
    },
    exit: {
      opacity: 0,
      y: 0,
      afterChildren: true,
    },
  })

  return (
    <Provider store={store}>
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        <Expanders>
          <Navigation/>
        </Expanders>
        {/*<Header />*/}
        <PoseGroup>
          <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
        </PoseGroup>
        <BrowserView>
          <Cursor />
        </BrowserView>
      </div>
    </Provider>
  )
}

TransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default TransitionWrapper
