import React, { Component } from "react"
import ExternalLink from "../../helper/links/ExternalLink.jsx"
import InternalLink from "../../helper/links/InternalLink.jsx"
import { connect } from "react-redux"

import "./footer.css"
import { StaticQuery, graphql } from "gatsby"
import { Symbol } from "../svg/logo.jsx"
// import {
//   IconInstagram,
//   IconFacebook,
//   IconTwitter,
//   IconLinkedIn,
// } from "../svg/snsIcons.jsx"
import VisibilitySensor from "react-visibility-sensor"

class Footer extends Component {
  state = {}

  render() {
    const { data } = this.props
    /*

        const sns = [
          {
            name: "Instagram",
            img: require("../../images/menu/sns-instagram.png"),
            img2x: require("../../images/menu/sns-instagram@2x.png"),
            svg: <IconInstagram theme="white"/>,
            link: data.instagramUrl,
          },
          {
            name: "Facebook",
            img: require("../../images/menu/sns-facebook.png"),
            img2x: require("../../images/menu/sns-facebook@2x.png"),
            svg: <IconFacebook theme="white"/>,
            link: data.facebookUrl,
          },
          {
            name: "Twitter",
            img: require("../../images/menu/sns-twitter.png"),
            img2x: require("../../images/menu/sns-twitter@2x.png"),
            svg: <IconTwitter theme="white"/>,
            link: data.twitterUrl,
          },
          {
            name: "LinkedIn",
            img: require("../../images/menu/sns-linkedin.png"),
            img2x: require("../../images/menu/sns-linkedin@2x.png"),
            svg: <IconLinkedIn theme="white"/>,
            link: data.linkedInUrl,
          },
        ]
    */

    return (
      <VisibilitySensor minTopValue="300" partialVisibility={true}>
        {({ isVisible }) => {
          if (isVisible) {
            this.props.hideMark()
          } else {
            this.props.showMark()
          }

          return (
            <footer>
              <div className="content-container footer-content">
                <div className="footer-left column">
                  <div className="symbol-container">
                    <InternalLink to="/">
                      <Symbol/>
                    </InternalLink>
                  </div>
                  <div className="catchphrase color-white">
                    {data.catchphrase}
                  </div>
                </div>
                <div className="footer-right column">
                  <div className="title">
                    <h3 className="type-comp1 color-white">联络我们</h3>
                  </div>
                  <div className="links contact">
                    <ExternalLink
                      href={`mailto:${data.generalEmail}`}
                      className="type-sub3 color-red link-underline email"
                    >
                      {data.generalEmail}
                    </ExternalLink>
                    <ExternalLink
                      href={`tel:${data.phone}`}
                      className="type-sub3 color-red link-underline tel"
                    >
                      {data.phone}
                    </ExternalLink>
                  </div>
                  <div className="title last">
                    <h3 className="type-comp1 color-white">浏览</h3>
                  </div>
                  <nav className="links type-sub3 ">
                    <ul className="footer-menu">
                      <li>
                        <InternalLink to="/projects">采撷案例</InternalLink>
                      </li>
                      {/*<li>*/}
                      {/*<InternalLink to="/services">业务范围</InternalLink>*/}
                      {/*</li>*/}
                      <li>
                        <InternalLink to="/about">关于我们</InternalLink>
                      </li>
                      {/*<li>*/}
                      {/*<InternalLink to="/careers">加入我们</InternalLink>*/}
                      {/*</li>*/}
                      <li>
                        <InternalLink to="/blog">行业视角</InternalLink>
                      </li>
                      {/*<li>*/}
                      {/*<InternalLink to="/lets-talk">联系我们</InternalLink>*/}
                      {/*</li>*/}
                    </ul>
                  </nav>
                  {/*<div className="info type-sub3 address">{data.address}</div>*/}
                </div>
              </div>
            </footer>
          )
        }}
      </VisibilitySensor>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
          defaultSettingsJson{
            generalEmail
            phone
            address
            catchphrase
            instagramUrl
            facebookUrl
            twitterUrl
            linkedInUrl
            copyright
          }
      }
    `}
    render={data => (
      <ConnectedFooter data={data.defaultSettingsJson} {...props} />
    )}
  />
)

const mapDispatchToProps = dispatch => {
  return {
    hideMark: () => dispatch({ type: "HIDE_MARK" }),
    showMark: () => dispatch({ type: "SHOW_MARK" }),
  }
}

const ConnectedFooter = connect(
  null,
  mapDispatchToProps,
)(Footer)
