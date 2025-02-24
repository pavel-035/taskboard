import Vue from 'vue'
import Vuex from 'vuex'

import tasks from '@/store/modules/tasks'
import statuses from '@/store/modules/statuses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks,
    statuses
  }
})
