import { createStore as reduxCreateStore } from 'redux'

const actionSwitch = {
  BUTTON_MOUSE_ENTER: (state, action) => {
    return Object.assign({}, state, {
      buttonHover: true,
    })
  },
  BUTTON_MOUSE_LEAVE: (state, action) => {
    return Object.assign({}, state, {
      buttonHover: false,
    })
  },
  BACKGROUND_BLACK: (state, action) => {
    return Object.assign({}, state, {
      backgroundColor: 'black',
    })
  },
  BACKGROUND_WHITE: (state, action) => {
    return Object.assign({}, state, {
      backgroundColor: 'white',
    })
  },
  BACKGROUND_RED: (state, action) => {
    return Object.assign({}, state, {
      backgroundColor: 'red',
    })
  },
  NO_HOMEPAGE_LOADING: (state, action) => {
    return Object.assign({}, state, {
      showHomepageLoading: false,
    })
  },
  SHOW_SYMBOL: (state, action) => {
    return Object.assign({}, state, {
      isSymbol: true,
    })
  },
  SHOW_LOGO: (state, action) => {
    return Object.assign({}, state, {
      isSymbol: false,
    })
  },
  HIDE_SCROLL_LABEL: (state, action) => {
    return Object.assign({}, state, {
      scrollLabelVisible: false,
    })
  },
  SHOW_SCROLL_LABEL: (state, action) => {
    return Object.assign({}, state, {
      scrollLabelVisible: true,
    })
  },
  HIDE_MARK: (state, action) => {
    return Object.assign({}, state, {
      showMark: false,
    })
  },
  SHOW_MARK: (state, action) => {
    return Object.assign({}, state, {
      showMark: true,
    })
  },
}

const reducer = (state, action) => {
  if (!actionSwitch[action.type]) {
    return state
  }
  return actionSwitch[action.type](state, action)
}

const initialState = {
  buttonHover: false,
  backgroundColor: 'white',
  showHomepageLoading: true,
  isSymbol: false,
  scrollLabelVisible: true,
  showMark: true,
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
