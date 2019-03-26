import React from 'react'

import './contentBlock.css'
import InternalLink from '../../helper/links/InternalLink'
import Parser from 'html-react-parser'
import Sparks from '../graphic/sparks'
import Parallax from '../../helper/parallax'
import { BrowserView, MobileView } from 'react-device-detect'
import CustomButton from '../button/button'

const ContentBlock = props => {
  const { page, momentumScrollValue } = props

  return (
    <div className="content-block-container">
      <div className="side-wrapper">
        <ul className="points type-tab2">
          {page.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <BrowserView>
          <div className="related">
            <h4 className="type-sub4 related-title">Related Services</h4>
            <ul className="related-list">
              {page.related.map(list => (
                <li key={list.id} className="type-sub3">
                  <InternalLink to={`/${list.slug}`}>{list.title}</InternalLink>
                </li>
              ))}
            </ul>
          </div>
        </BrowserView>
      </div>
      <div className="content-wrapper">
        <div className="content-spark">
          <Parallax viewportScroll={momentumScrollValue} moveRange="-100">
            <Sparks type="3" />
          </Parallax>
        </div>
        {Parser(page.bodyText.childContentfulRichText.html)}
        <MobileView>
          <div className="related">
            <h4 className="type-sub4 related-title">Related Services</h4>
            <ul className="related-list">
              {page.related.map(list => (
                <li key={list.id} className="type-sub3">
                  <InternalLink to={`/${list.slug}`}>{list.title}</InternalLink>
                </li>
              ))}
            </ul>
          </div>
        </MobileView>
        <div className="cta">
          <InternalLink to="/lets-talk">
            <CustomButton animate="true">Let's talk</CustomButton>
          </InternalLink>
        </div>
      </div>
    </div>
  )
}

export default ContentBlock
