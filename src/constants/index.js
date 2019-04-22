import devMode from '../utils/devmode'

function baseUrl(key) {
  let path = 'en/'
  if (window.pathSite) {
    path = window.pathSite
  }
  const devUrl = {
    BASE_URL: 'http://localhost:8080/',
    SITE: `http://sterling.it/${path}`,
    THEME_URL: `http://sterling.it/${path}/wp-content/themes/sterling/`,
    API_URL: `http://sterling.it/${path}wp-json/wp/v2`,
    API_CUSTOM: `http://sterling.it/${path}wp-json/gusto`,
    API_CF7: `http://sterling.it/${path}wp-json/contact-form-7/v1/contact-forms`,
    GA_CODE: 'UA-134134901-1',
  }
  const prodUrl = {
    BASE_URL: 'http://sterling.it/',
    SITE: 'http://sterling.it/',
    THEME_URL: `http://sterling.it/${path}/wp-content/themes/sterling/`,
    API_URL: `http://sterling.it/${path}wp-json/wp/v2`,
    API_CUSTOM: `http://sterling.it/${path}wp-json/gusto`,
    API_CF7: `http://sterling.it/${path}wp-json/contact-form-7/v1/contact-forms`,
    GA_CODE: 'UA-134134901-1',
  }
  if (devMode) {
    return devUrl[key]
  }
  return prodUrl[key]
}

export default {
  urls: {
    BASE_URL: baseUrl('BASE_URL'),
    SITE: baseUrl('SITE'),
    API_URL: baseUrl('API_URL'),
    API_MEDIA: `${baseUrl('API_URL')}/media`,
    API_MAIN_MENU: `${baseUrl('API_CUSTOM')}/nav/main_menu`,
    API_MOBILE_MENU: `${baseUrl('API_CUSTOM')}/nav/mobile_menu`,
    API_PAGE: `${baseUrl('API_URL')}/pages`,
    API_POST: `${baseUrl('API_URL')}/posts`,
    API_ROUTING: `${baseUrl('API_CUSTOM')}/routing-rules`,
    API_STRING: `${baseUrl('API_CUSTOM')}/strings`,
    API_FORM: `${baseUrl('API_CUSTOM')}/form`,
    API_MATERIAL: `${baseUrl('API_CUSTOM')}/materials`,
    API_CF7: baseUrl('API_CF7'),
    THREEJS: `${baseUrl('THEME_URL')}threejs/`,
    HOME_URL: '/',
  },
  status: {
    EMPTY: 'EMPTY',
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    ERROR: 'ERROR',
  },
  config: {
    GA_CODE: baseUrl('GA_CODE'),
    POST_PER_PAGE: 12,
    CANVAS_HOME: 'webgl_home',
    CANVAS_PRODUCTS: 'webgl_products',
    CANVAS_PRODUCT: 'webgl_product',
    CANVAS_LANDING: 'webgl_landing',
    CANVAS_ABOUT: 'webgl_about',
    CANVAS_ID_MENU: 'webglNav',
    DISP_HOME: 'gradient.jpg',
    LINK_DELAY: 0,
    LOADER_LOOP: 1, // 4
    LOADER_STATUS: 2,
    AUDIO_MP3: `${baseUrl('THEME_URL')}audio/ambient-3.mp3`,
    EFFECT_MP3: `${baseUrl('THEME_URL')}audio/effect-1.mp3`,
    CLICK_MP3: `${baseUrl('THEME_URL')}audio/click.mp3`,
  },
}



// WEBPACK FOOTER //
// src/constants/index.js
