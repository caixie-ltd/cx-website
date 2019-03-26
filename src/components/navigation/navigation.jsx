import React, { Component } from "react"
import posed from "react-pose"
import SplitText from "react-pose-text"
import Menu from "./menu.jsx"
import { StaticQuery, graphql } from "gatsby"
import "./navigation.css"
import { easeFunction } from "../../helper/variables.jsx"
import ExternalLink from "../../helper/links/ExternalLink.jsx"
import CTA from "../header/cta.jsx"
import {
  IconInstagram,
  IconFacebook,
  IconTwitter,
  IconLinkedIn,
} from "../svg/snsIcons.jsx"
import { MobileView, BrowserView } from "react-device-detect"

const Cover = posed.div({
  active: {
    x: 0,
    transition: {
      duration: 0,
    },
  },
  inactive: {
    x: "100vw",
    transition: {
      duration: 0,
      delay: 850,
    },
  },
})

const CoverBackground = posed.div({
  active: {
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 2000,
      ease: easeFunction("type_third"),
    },
  },
  inactive: {
    scaleX: 0,
    scaleY: 0,
    x: ({ clickOutX }) => clickOutX,
    y: ({ clickOutY }) => clickOutY,
    transition: {
      duration: 850,
      ease: easeFunction("type_fourth"),
    },
  },
})

const Nav = posed.nav({
  active: {
    opacity: 1,
    transition: {
      duration: 450,
      ease: easeFunction(),
    },
    staggerChildren: 50,
  },
  inactive: {
    opacity: 0,
    transition: {
      duration: 450,
      ease: easeFunction(),
    },
  },
})

const Info = posed.div({
  active: {
    opacity: 1,
    transition: {
      duration: 450,
      ease: easeFunction(),
    },
  },
  inactive: {
    opacity: 0,
    transition: {
      duration: 450,
      ease: easeFunction(),
    },
  },
})

const SNS = posed.ul({
  active: {
    staggerChildren: 40,
  },
})

const SNSItem = posed.li({
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
  },
})

const textAnimation = {
  active: {
    y: 0,
    opacity: 1,
    transition: ({ charIndex }) => ({
      duration: 250,
      easings: easeFunction(),
      delay: charIndex * 10,
    }),
  },
  inactive: {
    y: 10,
    opacity: 0,
  },
}

class CoverMenu extends Component {
  state = {
    focused: null,
  }

  focusMenu = menu => {
    this.setState({
      focused: menu,
    })
  }

  focusOutMenu = menu => {
    this.setState({
      focused: null,
    })
  }

  render() {
    const {
      theme,
      active,
      onMenuClick,
      data,
      clickOutX,
      clickOutY,
    } = this.props

    const menu = [
      {
        label: "采撷案例",
        link: "/work",
      },
      {
        label: "服务项目",
        link: "/services",
      },
      {
        label: "关于我们",
        link: "/about",
      },
      // {
      //   label: "行业视角",
      //   link: "/blog",
      // },
      {
        label: "联系我们",
        link: "/lets-talk",
      },
    ]

    const sns = [
      {
        name: "Instagram",
        img: require("../../images/menu/sns-instagram.png"),
        img2x: require("../../images/menu/sns-instagram@2x.png"),
        svg: <IconInstagram theme={theme}/>,
        link: data.instagramUrl,
      },
      {
        name: "Facebook",
        img: require("../../images/menu/sns-facebook.png"),
        img2x: require("../../images/menu/sns-facebook@2x.png"),
        svg: <IconFacebook theme={theme}/>,
        link: data.facebookUrl,
      },
      {
        name: "Twitter",
        img: require("../../images/menu/sns-twitter.png"),
        img2x: require("../../images/menu/sns-twitter@2x.png"),
        svg: <IconTwitter theme={theme}/>,
        link: data.twitterUrl,
      },
      {
        name: "LinkedIn",
        img: require("../../images/menu/sns-linkedin.png"),
        img2x: require("../../images/menu/sns-linkedin@2x.png"),
        svg: <IconLinkedIn theme={theme}/>,
        link: data.linkedInUrl,
      },
    ]

    return (
      <Cover pose={active ? "active" : "inactive"}>
        <div
          className={`cover-menu background-is-${theme} ${
            active ? "active" : ""
            }`}
        >
          <CoverBackground
            className={`cover-background background-is-${theme}`}
            clickOutX={clickOutX}
            clickOutY={clickOutY}
          />
          <div className="content-container">
            <div className="highlighter-wrapper">
              <div className="menu-highlighter type-bg1"/>
            </div>
            <div className="content-wrapper">
              <Nav className="primary-nav">
                <div className="label type-comp2">菜单</div>
                <Menu
                  menu={menu}
                  focused={this.state.focused}
                  onMenuFocus={this.focusMenu}
                  onMenuFocusOut={this.focusOutMenu}
                  onMenuClick={onMenuClick}
                />
                <MobileView>
                  <CTA
                    theme={theme === "white" ? "black" : "white"}
                    onMenuClick={onMenuClick}
                  />
                </MobileView>
              </Nav>
              <Info className="company-info">
                <ExternalLink
                  href={`mailto:${data.generalEmail}`}
                  className="email link-underline type-sub3"
                >
                  <SplitText
                    charPoses={textAnimation}
                    pose={active ? "active" : "inactive"}
                  >
                    {data.generalEmail}
                  </SplitText>
                </ExternalLink>
                <br/>
                <ExternalLink
                  href={`tel:${data.phone}`}
                  className="phone link-underline type-sub3"
                >
                  <SplitText
                    charPoses={textAnimation}
                    pose={active ? "active" : "inactive"}
                  >
                    {data.phone}
                  </SplitText>
                </ExternalLink>
                <BrowserView>
                  <div className="address type-sub3">
                    <SplitText
                      charPoses={textAnimation}
                      pose={active ? "active" : "inactive"}
                    >
                      {data.address}
                    </SplitText>
                  </div>
                </BrowserView>
{/*                <SNS
                  pose={active ? "active" : "inactive"}
                  className="sns-links"
                >
                  {sns.map(({ svg, link, name }) => (
                    <SNSItem key={name}>
                      <ExternalLink
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        <div className="link">{svg}</div>
                      </ExternalLink>
                    </SNSItem>
                  ))}
                </SNS>*/}
              </Info>
            </div>
          </div>
        </div>
      </Cover>
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
            instagramUrl
            facebookUrl
            twitterUrl
            linkedInUrl
            copyright
          }
      }
    `}
    render={data => (
      <CoverMenu data={data.defaultSettingsJson} {...props} />
    )}
  />
)
