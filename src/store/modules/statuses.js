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
    async fetchStatuses ({ commit }) {
      try {
        const response = await fetch('data/statuses.json')
        const statuses = await response.json()

        commit('SET_STATUSES', statuses)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getStatuses: state => state.statuses
  }
}
