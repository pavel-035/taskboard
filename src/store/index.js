import Vue from 'vue'
import Vuex from 'vuex'

import tasks from '@/store/modules/tasks'
import states from '@/store/modules/states'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tasks,
    states
  }
})
