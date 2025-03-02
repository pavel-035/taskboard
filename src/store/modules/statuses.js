import api from '@/api'

export default {
  namespaced: true,

  state: () => {
    return {
      statuses: []
    }
  },
  mutations: {
    SET_STATUSES (state, statuses) {
      state.statuses = statuses
    }
  },
  actions: {
    async loadStatuses ({ commit }) {
      const statuses = await api.statuses.fetchStatuses() ?? []

      commit('SET_STATUSES', statuses)
    }
  },
  getters: {
    getStatuses: state => state.statuses
  }
}
