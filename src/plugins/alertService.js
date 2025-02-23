export default {
  install (Vue) {
    Vue.prototype.$alert = function (title, description, type) {
      this.$root.$emit('alert', { title, description, type, id: generateAlertId() })
    }
  }
}

function generateAlertId () {
  return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000)
}
