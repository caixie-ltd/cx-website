
const style = theme => ({
  root: {
    top: 0,
    left: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
    cursor: 'pointer',
    '& button': {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
    },
  },
  magnetic: {
    width: '150%',
    height: '150%',
    position: 'absolute',
    zIndex: -1,
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0)',
  },
  wrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > a, & > delayLink': {
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:before': {
        content: '""',
        width: '150%',
        height: '150%',
        position: 'absolute',
        zIndex: -1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0)',
        borderRadius: '50%',
      },
      '& *': {
        pointerEvents: 'none',
      },
      '&:hover': {
        '& .icon': {
        },
        '& .border': {
          fill: 'transparent',
        },
      },
    },
  },
  border: {
    width: '100%',
    height: '100%',
    fill: 'transparent',
    stroke: props => (props.layout === 2 ? theme.getRgba(theme.colors[0], 0.1) : theme.getRgba(theme.colors[1], 0.1)),
    strokeWidth: 1,
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
  },
  icon: {
    fill: props => (props.layout === 2 ? theme.colors[0] : theme.colors[1]),
  },
  text: {
    display: 'inline-block',
    margin: 0,
    padding: 0,
    height: props => (props.height ? props.height : 35),
  },
  [theme.mediaInverse.md]: {
    component: {
    },
  },
})

export default style


