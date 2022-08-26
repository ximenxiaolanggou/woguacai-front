import Vue from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.css' // global css
import '@/assets/ali/iconfont.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import router from './router'
import store from './store'

import './permission'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts //挂载到Vue实例上面

Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

