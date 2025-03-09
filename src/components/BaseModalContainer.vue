<template>
  <div
    v-if="isOpen"
    class="base-modal"
  >
    <div class="base-modal__wrapper">
      <component
        :is="component"
        v-bind="componentProps"

        @confirm="
          confirm()
          onConfirm()
        "
        @cancel="
          cancel()
          onCancel()
        "
        @close="
          close()
          onClose()
        "
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'BaseModalContainer',
  components: {
    BaseButton
  },
  data () {
    return {
      isOpen: false,

      componentName: null,
      componentProps: null,

      onConfirm: () => {},
      onClose: () => {},
      onCancel: () => {}
    }
  },
  computed: {
    component () {
      return () => import(`@/components/${this.componentName}.vue`)
    }
  },
  created () {
    this.$root.$on('modal', (modal) => {
      this.isOpen = true

      this.componentName = modal.slot
      this.componentProps = modal.slotProps

      this.onConfirm = modal.onConfirm
      this.onCancel = modal.onCancel
      this.onClose = modal.onClose
    })
  },
  methods: {
    confirm () {
      this.close()
    },
    cancel () {
      this.close()
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  background: rgba(0, 0, 0, 0.6);
  &__wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 22px;

    border-radius: 8px;
    background: #FFFFFF;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
