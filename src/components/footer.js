import React, { Component } from "react"
import cls from "./footer.module.scss"
import Contact from "./contact"

export default class Footer extends Component {
  render() {
    return (
      <footer className={cls.footer}>
        <div className={cls.footer__logo}>
          <a href="/">
            <img src="/assets/c-logo.svg" alt="Vincit Logo"/>
          </a>
        </div>
        <nav className={cls.footer__nav}>
          <ul className={cls.footer__links}>
            <li className={cls.footer__link}>
              <a href="/projects">Projects</a>
            </li>
            <li className={cls.footer__link}>
              <a href="/about">About</a>
            </li>
            <li className={cls.footer__link}>
              <a href="/blog">Blog</a>
            </li>
            <li className={cls.footer__link}>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </nav>
        <div className={cls.footer__copy}>
          © 2019 北京采撷科技有限公司
        </div>
      </footer>
    )
  }
}
