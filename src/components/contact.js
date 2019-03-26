import React, { Component } from "react"
import cls from "./contact.module.scss"
import ExternalLink from "../helper/links/ExternalLink"

export default class Contact extends Component {
  render() {
    return (
      <div className={cls.contact}>
        <p>
          13488689885<br/>
          hello@caixie.top
        </p>
        <ul className={cls.contact__social}>
          <li className={cls.contact__socialLink}>
            {/*<InternalLink>*/}
            <ExternalLink href="https://www.linkedin.com/company/vincit-oy/" target="_blank">
              <img src="/dist/social-linkedin.svg"
                   alt=""/></ExternalLink>
          </li>
          <li className={cls.contact__socialLink}>
            <ExternalLink href="https://www.instagram.com/vincitcalifornia/" target="_blank">
              <img src="/dist/social-instagram.svg"
                   alt=""/></ExternalLink>
          </li>
          <li className={cls.contact__socialLink}>
            <ExternalLink href="https://medium.com/vincit" target="_blank">
              <img src="/dist/social-medium.svg"
                   alt=""/></ExternalLink>
          </li>
        </ul>
      </div>
    )
  }
}
