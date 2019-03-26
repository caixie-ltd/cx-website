import React, { Component } from "react"
import cls from "./contact.module.scss"

export default class Contact extends Component {
  render() {
    return (
      <div className={cls.contact}>
        <p>
          (949) 751-2140<br/>
          california@vincit.com
        </p>
        <ul className={cls.social}>
          <li className={cls.socialLink}>
            <a href="https://www.linkedin.com/company/vincit-oy/" >
              <img src="/dist/social-linkedin.svg" alt="Vincit on Linkedin"/>
            </a>
          </li>
          <li className={cls.socialLink}>
            <a href="https://twitter.com/vincitcali" >
              <img src="/dist/social-twitter.svg" alt="Vincit on Twitter"/></a>
          </li>
          <li className={cls.socialLink}>
            <a href="https://www.facebook.com/VincitCalifornia/" >
              <img src="/dist/social-facebook.svg" alt="Vincit on Facebook"/></a>
          </li>
          <li className={cls.socialLink}>
            <a href="https://www.instagram.com/vincitcalifornia/" >
              <img src="/dist/social-instagram.svg" alt="Vincit on Instagram"/></a>
          </li>
          <li className={cls.socialLink}>
            <a href="https://medium.com/vincit" >
              <img src="/dist/social-medium.svg" alt="Vincit on Medium"/></a>
          </li>
        </ul>
      </div>

    )
  }
}
