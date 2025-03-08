export default {
  install (Vue) {
    Vue.prototype.$modal = function ({
      slot,
      slotProps,
      onConfirm,
      onCancel,
      onClose
    }) {
      this.$root.$emit('modal', {
        slot,
        slotProps,
        onConfirm,
        onCancel,
        onClose
      })
    }
  }
}
