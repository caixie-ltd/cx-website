import _ from "lodash"

export const svg = (name) => {
  return `
        <svg aria-hidden="true" class="icon icon-${name}-vector" role="img">
            <use href="#${name}-vector"  xlink:href="#${name}-vector"></use>
        </svg>
    `
}

/**
 * Returns an HTML element based off of an HTML string
 * @param template
 * @param parent
 * @returns {Element | null}
 */
export const render = (template, parent = null) => {
  let el = document.createElement("div")

  if (_.isFunction(template)) {
    template = template()
  }

  el.innerHTML = template
  el = el.firstElementChild

  if (parent) {
    parent.appendChild(el)
  }

  return el
}
