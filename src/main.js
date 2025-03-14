import Vue from 'vue'
import App from './App.vue'
import store from './store'

import AlertService from '@/plugins/alertService'
import ModalService from '@/plugins/modalService'

import router from './router'
import indexDB from '@/indexDB'

import '@/assets/styles/index.scss'
import '@/assets/styles/fonts.css'

Vue.config.productionTip = false

Vue.use(AlertService)
Vue.use(ModalService)

async function initApp () {
  await indexDB.init()

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
}

initApp()
