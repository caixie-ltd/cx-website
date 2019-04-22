export default function mapRange(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin)
}



// WEBPACK FOOTER //
// src/utils/math.js
