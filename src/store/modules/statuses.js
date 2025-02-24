export default {
  namespaced: true,

  state: () => {
    return {
      states: []
    }
  },
  mutations: {
    SET_STATES (state, states) {
      state.states = states
    }
  },
  actions: {
    async fetchStates ({ commit }) {
      try {
        const response = await fetch('data/states.json')
        const states = await response.json()

        commit('SET_STATES', states)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getStates: state => state.states
  }
}
