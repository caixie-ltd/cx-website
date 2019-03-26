import { Component } from "react"
import cls from "./navigation.module.scss"
import React from "react"
// import Menu from "./menu"
import InternalLink from "../../../helper/links/InternalLink"

export default class Navigation extends Component {
  render() {
    return (
      <nav className={cls.nav}>
        <a href="/" className={`${cls.navLogo} ${cls.isHome}`}>
          <img src="/assets/logo-white2.svg" alt="Caixie Logo"/>
        </a>
        <ul className={cls.navLinks}>
          <li>
            <InternalLink to="/projects">采撷案例</InternalLink>
          </li>
          <li><InternalLink to="/about">关于我们</InternalLink></li>
          {/*<li><InternalLink to="/careers">加入我们</InternalLink></li>*/}
          <li><InternalLink to="/blog">行业视角</InternalLink></li>
        </ul>
        {/*<div className={cls.navMenu}>*/}
          {/*<Menu/>*/}
        {/*</div>*/}
      </nav>

    )
  }
}
