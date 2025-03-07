import Vue from 'vue'
import Vuex from 'vuex'

import tasks from '@/store/modules/tasksStore'
import statuses from '@/store/modules/statusesStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks,
    statuses
  }
})
