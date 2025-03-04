import api from '@/api'

const defaultStatuses = [
  {
    label: 'На согласовании',
    color: '#FF99E9'
  },
  {
    label: 'Новые',
    color: '#66B8FF'
  },
  {
    label: 'В процессе',
    color: '#FFD466'
  },
  {
    label: 'Готово',
    color: '#53C666'
  },
  {
    label: 'Доработать',
    color: '#F76E85'
  }
]

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
    async loadStatuses ({ commit, dispatch }) {
      const statuses = await api.statuses.fetchStatuses() ?? []

      if (!statuses.length) {
        await dispatch('generateStatuses')
        return
      }

      commit('SET_STATUSES', statuses)
    },
    async generateStatuses ({ dispatch }) {
      for (const status of defaultStatuses) {
        await api.statuses.addStatus(status)
      }

      await dispatch('loadStatuses')
    }
  },
  getters: {
    getStatuses: state => state.statuses
  }
}
