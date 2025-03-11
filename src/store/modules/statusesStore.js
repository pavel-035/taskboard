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
      statuses: [],
      tasksByStatuses: []
    }
  },
  mutations: {
    SET_STATUSES (state, statuses) {
      state.statuses = statuses
    },
    SET_TASKS_BY_STATUSES (state, tasksByStatuses) {
      state.tasksByStatuses = tasksByStatuses
    }
  },
  actions: {
    async loadStatuses ({ commit, dispatch }) {
      try {
        dispatch('loader/startLoading', null, { root: true })

        const statuses = await api.statuses.fetchStatuses() ?? []

        commit('SET_STATUSES', statuses)
      } catch (error) {
        console.error('[STORE] Loading statuses', error)
        throw error
      } finally {
        dispatch('loader/stopLoading', null, { root: true })
      }
    },
    async loadTasksByStatuses ({ commit, dispatch }) {
      try {
        dispatch('loader/startLoading', null, { root: true })

        const tasksByStatuses = await api.statuses.fetchTasksByStatuses()

        if (!tasksByStatuses.length) {
          await dispatch('generateStatuses')
          return
        }

        commit('SET_TASKS_BY_STATUSES', tasksByStatuses)
      } catch (error) {
        console.error('[STORE] Loading tasks by statuses', error)
        throw error
      } finally {
        dispatch('loader/stopLoading', null, { root: true })
      }
    },
    async generateStatuses ({ dispatch }) {
      try {
        dispatch('loader/startLoading', null, { root: true })

        for (const status of defaultStatuses) {
          await api.statuses.addStatus(status)
        }

        await dispatch('loadStatuses')
        await dispatch('loadTasksByStatuses')
      } catch (error) {
        console.error('[STORE] Generating default statuses', error)
        throw error
      } finally {
        dispatch('loader/stopLoading', null, { root: true })
      }
    }
  },
  getters: {
    getStatuses: state => state.statuses,
    getStatusByID: state => id => state.statuses.find(status => status.id === id),
    getTasksByStatuses: state => state.tasksByStatuses
  }
}
