const testElementMethods = (methods) => {
  let el = document.createElement('div');
  for (let name in methods) {
    if (!methods.hasOwnProperty(name)) continue;

    if (el.style[name] !== undefined) {
      return methods[name];
    }
  }
};

const transitionEndEventName = () => testElementMethods({
  'transition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd'
});

const animationEndEventName = () => testElementMethods({
  'animation': 'animationend',
  'WebkitAnimationEnd': 'webkitAnimationEnd'
});

export const TRANSITION_END_EVENT_NAME = transitionEndEventName();
export const ANIMATION_END_EVENT_NAME = animationEndEventName();
