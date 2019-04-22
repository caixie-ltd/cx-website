import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setStatus } from '../../actions/loading'
import { setHover, removeHover, setLabel } from '../../actions/pointer'

import utils from '../../utils'

class DelayLink extends Component {
  static contextTypes = Link.contextTypes

  constructor(props) {
    super(props)
    this.timeout = null
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  onHoverIn = () => {
    this.props.setHover(true)
    if (this.props.title !== undefined) {
      this.props.setLabelPointer(this.props.title)
    }
  }

  onHoverOut = () => {
    this.props.setHover(false)
    // if (this.props.title !== undefined) {
    //   this.props.setLabelPointer('')
    // }
  }

  /**
   * Called when the link is clicked
   *
   * @param {Event} e
   */
  handleClick = (e) => {
    const { replace, to, delay, onDelayStart, onDelayEnd, initHover, setLabelPointer } = this.props
    const { history } = this.context.router
    if (history.location.pathname !== utils.path.cleanOrigin(to)) {
      // this.props.setLoading(true)
      onDelayStart(e, utils.path.cleanOrigin(to))
      if (e.defaultPrevented) {
        return
      }
      e.preventDefault()

      this.timeout = setTimeout(() => {
        initHover()
        setLabelPointer('')
        if (replace) {
          history.replace(utils.path.cleanOrigin(to))
        } else {
          history.push(utils.path.cleanOrigin(to))
        }
        onDelayEnd(e, utils.path.cleanOrigin(to))
      }, delay)
    }
  }

  render() {
    const props = Object.assign({}, this.props)
    delete props.delay
    delete props.onDelayStart
    delete props.onDelayEnd
    delete props.setLoading
    delete props.initHover
    delete props.setHover
    delete props.setLabelPointer
    delete props.hover
    delete props.loading
    delete props.title // rimosso per non vedere tooltip browser, ma servirebbe per la SEO
    return (
      <Link
        ref={node => (this.node = node)}
        onClick={this.handleClick}
        onMouseEnter={this.onHoverIn}
        onMouseLeave={this.onHoverOut}
        {...props}
      />
    )
  }
}

DelayLink.defaultProps = {
  delay: 0,
  onDelayStart: () => {},
  onDelayEnd: () => {},
}
const mapStateToProps = state => ({
  loading: state.loading,
})
const mapDispatchToProps = dispatch => ({
  setLoading: (state) => { dispatch(setStatus(state)) },
  setHover: (bool) => { dispatch(setHover(bool)) },
  initHover: () => { dispatch(removeHover()) },
  setLabelPointer: (string) => { dispatch(setLabel(string)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(DelayLink)



// WEBPACK FOOTER //
// src/components/DelayLink/index.js
