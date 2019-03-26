import React, { Component } from 'react'
import './application.css'
import InputField from '../common/inputfield'
import { connect } from 'react-redux'
import CustomButton from '../button/button'
import Textarea from '../common/textarea'
import { navigate } from 'gatsby'

class Application extends Component {
  state = {
    dummy: '',
    portfolio: '',
    linkedin: '',
    about: '',
    name: '',
    phone: '',
    email: '',
  }

  encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  onSubmit = event => {
    event.preventDefault()

    const { name, phone, email, portfolio, linkedin, about, dummy } = this.state

    const fields = {
      name,
      phone,
      email,
      portfolio,
      linkedin,
      about,
      dummy,
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encode({ 'form-name': 'application', ...fields }),
    }).then(() => {
      navigate('/application-thank-you')
    })
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  render() {
    const { title, page } = this.props
    const { dummy, portfolio, linkedin, about, name, phone, email } = this.state

    return (
      <div className="application-wrapper">
        <div className="content-container">
          <div className="form-wrapper">
            <h2 className="type-h1">{title}</h2>
            <form
              name="application"
              action="/application-thank-you"
              method="POST"
              className="application-form"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="position" value={page.heroHeadline} />
              <input type="hidden" name="form-name" value="application" />
              <input type="hidden" name="bot-field" />
              <div className="row">
                <div className="half-column">
                  <label>
                    <InputField
                      type="url"
                      name="portfolio"
                      placeholder="Portfolio URL"
                      value={portfolio}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="half-column">
                  <label>
                    <InputField
                      type="url"
                      name="linkedin"
                      value={linkedin}
                      placeholder="LinkedIn URL"
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full-column">
                  <div className="form-subtitle type-h10">About you</div>
                </div>
              </div>
              <div className="row">
                <div className="full-column">
                  <label>
                    <Textarea
                      name="about"
                      value={about}
                      placeholder="Please tell us a little bit about you "
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full-column">
                  <div className="form-subtitle type-h10">
                    Contact information
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="half-column">
                  <label>
                    <InputField
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Name"
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="half-column">
                  <label>
                    <InputField
                      type="tel"
                      name="phone"
                      value={phone}
                      placeholder="Phone number"
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full-column">
                  <label>
                    <InputField
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email address"
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              </div>

              <div className="row ">
                <div className="half-column button-container">
                  <CustomButton theme="black" type="submit" animate="true">
                    Submit
                  </CustomButton>
                </div>
                <div className="half-column type-sub3 comment">
                  Baunfire is an equal opportunity employer.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    backgroundBlack: () => dispatch({ type: 'BACKGROUND_BLACK' }),
    backgroundWhite: () => dispatch({ type: 'BACKGROUND_WHITE' }),
    backgroundRed: () => dispatch({ type: 'BACKGROUND_RED' }),
    noHomepageLoading: () => dispatch({ type: 'NO_HOMEPAGE_LOADING' }),
  }
}

const ConnectedApplication = connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)

export default ConnectedApplication
