export default {
  install (Vue) {
    Vue.prototype.$alert = function (type, title, description) {
      this.$root.$emit('alert', { title, description, type, id: generateAlertId() })
    }
  }
}

function generateAlertId () {
  return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000)
}
