export default {
  namespaced: true,

  state: () => {
    return {
      tasks: []
    }
  },
  getters: {
    getTasks: state => state.tasks
  }
}
