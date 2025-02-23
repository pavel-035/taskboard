import Vue from 'vue'
import App from './App.vue'

import AlertService from '@/plugins/alertService'

import '@/assets/styles/fonts.css'
import '@/assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(AlertService)

new Vue({
  render: h => h(App)
}).$mount('#app')
