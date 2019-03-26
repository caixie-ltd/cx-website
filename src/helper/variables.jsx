import { easing } from 'popmotion'

export function easeFunction(TYPE) {
  const TYPE_PRIMARY = 'type_primary'
  const TYPE_SECOND = 'type_second'
  const TYPE_THIRD = 'type_third'
  const TYPE_FOURTH = 'type_fourth'

  const { cubicBezier } = easing

  switch (TYPE) {
    case TYPE_FOURTH:
      return cubicBezier(0.63, 0.03, 0, 1)
    case TYPE_THIRD:
      return cubicBezier(0.19, 1, 0.22, 1)
    case TYPE_SECOND:
      return cubicBezier(0.835, -0.005, 0.06, 1)
    case TYPE_PRIMARY:
    default:
      return cubicBezier(0.475, 0.425, 0, 0.995)
  }
}

export function animations(mode, showHomepageLoading) {
  const modes = {
    SLIDE: {
      exit: { opacity: 0, x: -20 },
      enter: {
        opacity: 1,
        x: 0,
        delay: ({ wordIndex }) =>
          wordIndex * 100 + (showHomepageLoading ? 1500 : 0),
        transition: {
          duration: 1450,
          ease: easeFunction('type_fourth'),
        },
      },
    },
    ARISE: {
      exit: {
        opacity: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        y: 20,
      },
      enter: {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        delay: ({ wordIndex }) =>
          wordIndex * 100 + (showHomepageLoading ? 2000 : 0),
        transition: {
          duration: 1450,
          ease: easeFunction('type_fourth'),
        },
      },
    },
    ARISE_NO_DELAY: {
      exit: {
        opacity: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        y: 20,
      },
      enter: {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        transition: {
          duration: 1250,
          ease: easeFunction('type_fourth'),
        },
      },
    },
  }

  return modes[mode]
}
