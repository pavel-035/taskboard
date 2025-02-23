import Vue from 'vue'
import App from './App.vue'
import store from './store'

import AlertService from '@/plugins/alertService'

import '@/assets/styles/fonts.css'
import '@/assets/styles/index.scss'
import router from './router'

Vue.config.productionTip = false

Vue.use(AlertService)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
