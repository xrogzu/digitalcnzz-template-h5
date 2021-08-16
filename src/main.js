// 兼容 IE
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole'

if (process.env.VUE_APP_ENV !== 'production') {
  Vue.use(new Vconsole())
}

import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

import VueAMap from 'vue-amap'
Vue.use(VueAMap)

import DigitalUI from '@digitalcnzz/mobile-ui'
Vue.use(DigitalUI)

VueAMap.initAMapApiLoader({
  key: 'bee29266f58bf456be8bb5bf92347ee7',
  plugin: ['AMap.Geocoder'],
  v: '1.4.15'
})

import '@/plugins/vant'
import '@/assets/css/index.scss'
import '@/assets/scss/index.scss'
import 'lib-flexible/flexible.js'
import Moment from 'moment'

// 配置moment全局时间过滤器
Vue.filter('formatTime', function (data, format) {
  return Moment(data).format(format)
})
// filters
import './filters'
Vue.config.productionTip = false
// import { configWXSDK, startMutiPlatformVerify } from '@/utils/auth'
const initVueApp = () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  // configWXSDK() // 获取微信sdk签名信息
}

initVueApp() // 本地调试以及不需要支持其他平台(微信、支付宝)登录的话启用，如果需要多端支持，打包发布之前需要注释掉
// startMutiPlatformVerify(initVueApp) // 如果需要多端支持，打包发布线上需要开启
