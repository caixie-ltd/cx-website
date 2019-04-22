
const style = theme => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: props => (props.width ? props.width : '100%'),
    height: props => (props.height ? props.height : '100%'),
    left: props => (props.left ? props.left : 0),
    top: props => (props.top ? props.top : 0),
    opacity: props => (props.opacity ? props.opacity : 1),
    paddingBottom: props => (props.line ? 4 : 0),
    /* transition: `opacity ${theme.animations.time} ${theme.animations.ease}`,
    '&.navOpen': {
      opacity: 1,
    }, */
    '&.center': {
      '& $string': {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
  container: {
    display: 'inline-block',
    height: props => (props.height ? props.height : '100%'),
    width: '100%',
    position: 'relative',
    left: 0,
    top: props => (props.line ? -4 : 0),
    overflowY: 'hidden',
  },
  string: {
    position: 'absolute',
    height: props => (props.height ? props.height : '100%'),
    // paddingBottom: props => (props.line ? 5 : 0),
    width: 'auto',
    left: 0,
    top: 0,
    display: 'block',
    fontSize: props => (props.fontSize ? props.fontSize : 9),
    letterSpacing: props => (props.letterSpacing ? props.letterSpacing : '1.8px'),
    textTransform: props => (props.textTransform ? props.textTransform : 'uppercase'),
    lineHeight: props => (props.lineHeight ? props.lineHeight : '9px'),
    fontWeight: props => (props.fontWeight ? props.fontWeight : '700'),
    color: props => (props.color ? props.color : theme.colors[0]),
    fontFamily: props => (props.fontFamily ? props.fontFamily : theme.fonts[0]),
    // transition: `color ${theme.animations.time} ${theme.animations.ease}`,
    '&.top': {
      top: 0,
    },
    '&.bottom': {
      top: props => (props.height ? props.height : '100%'),
    },
    /* '.navOpen &': {
      color: '#fff',
    }, */
  },
  lineContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: 'auto',
    height: 1,
    overflowY: 'hidden',
  },
  line: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: 1,
    display: 'block',
    background: props => (props.background ? props.background : theme.colors[0]),
    transformOrigin: '0% 0%',
    /* '.navOpen &': {
      background: '#fff',
    }, */
  },
})

export default style



// WEBPACK FOOTER //
// src/components/LabelString2/style.js
