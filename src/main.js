import Vue from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/styles/index.css' // global css

import router from './router'
import store from './store'

import './permission'

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

