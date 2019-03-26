import { Component } from "react"
// import ScrollManager from "../../pages/aboutus"
import React from "react"
import Flickity from "react-flickity-component"

export default class ImageSlider extends Component{
  render() {
    return(
      <section className="image-slider standard-section bkg-fade -visible" data-bkg="#ffffff">
        <div className="image-slider__container standard-section__container">
          <div className="image-slider__cards is-draggable" tabIndex="0">

            <Flickity
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
            >
              <img src="/images/placeholder.png"/>
              <img src="/images/placeholder.png"/>
              <img src="/images/placeholder.png"/>
            </Flickity>

            <button className="flickity-button flickity-prev-next-button previous" type="button"
                    aria-label="Previous">
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path
                  d="M24.443 55.428l15.071 16.746-9.633 8.67L1.175 48.948 29.88 17.044l9.634 8.669-15.076 16.755h73.948v12.96z"
                  className="arrow"></path>
              </svg>
            </button>
            <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next">
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path
                  d="M24.443 55.428l15.071 16.746-9.633 8.67L1.175 48.948 29.88 17.044l9.634 8.669-15.076 16.755h73.948v12.96z"
                  className="arrow" transform="translate(100, 100) rotate(180) "></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  }
}
