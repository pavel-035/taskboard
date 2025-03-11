export default {
  namespaced: true,

  state: {
    loadingCount: 0 // Счётчик активных запросов
  },
  mutations: {
    INCREMENT_LOADING (state) {
      state.loadingCount++
    },
    DECREMENT_LOADING (state) {
      if (state.loadingCount > 0) {
        state.loadingCount--
      }
    }
  },

  actions: {
    startLoading ({ commit }) {
      commit('INCREMENT_LOADING')
    },
    stopLoading ({ commit }) {
      commit('DECREMENT_LOADING')
    }
  },

  getters: {
    isLoading: (state) => state.loadingCount > 0
  }
}
