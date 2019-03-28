import React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import { Text } from './styled'

const LOADING = 'sending'
const ERROR = 'error'
const SUCCESS = 'success'
const NO_OP = () => {}

const Container = styled.div`
  padding: 0.625rem 0.8rem;
  border: solid 1px ${themeGet('colors.gray1')};
  text-align: center;
`

const Form = styled.form`
  width: 100%;
  margin: 0;
  display: flex;

  & > * {
    line-height: 1.4;
    font-size: ${themeGet('fontSizes.2')};
  }
`

const Input = styled.input`
  outline: none;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  &::placeholder {
    color: #bdbdbd;
  }
`

const Submit = styled.input`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:disabled {
    color: ${themeGet('colors.gray1')};
  }
`

export default class TextSubmit extends React.Component {
  static defaultProps = {
    submitText: 'Submit',
    errorText: 'Error',
    successText: 'Success',
    loadingText: 'Loading',
    isValid: NO_OP,
    onSubmit: NO_OP
  }

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    this.onChange = this.onChange.bind(this)
    this.wrappedOnSubmit = this.wrappedOnSubmit.bind(this)
  }

  onChange(event) {
    this.setState({ value: event.target.value })
  }

  wrappedOnSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render() {
    const {
      border,
      status,
      placeholder,
      isValid,
      loadingText,
      errorText,
      successText,
      submitText
    } = this.props

    const submitDisabled = !isValid(this.state.value) || status === LOADING

    if (status === SUCCESS) {
      return (
        <Container>
          <Text>{successText}</Text>
        </Container>
      )
    }

    return (
      <React.Fragment>
        <Container border={border}>
          <Form onSubmit={this.wrappedOnSubmit} name="email-subscribe">
            <Input
              title="Email Input"
              name="email"
              type="email"
              placeholder={placeholder}
              value={this.state.value}
              onChange={this.onChange}
            />
            <Submit
              title="Submit"
              type="submit"
              disabled={submitDisabled}
              value={status === LOADING ? loadingText : submitText}
            />
          </Form>
        </Container>
        {status === ERROR ? (
          <Text.error mt={3} maxWidth="14rem">
            {errorText.toString()}
          </Text.error>
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
