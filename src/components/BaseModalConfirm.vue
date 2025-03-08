<template>
  <div class="base-modal-confirm">
    <div class="base-modal-confirm__wrapper">
      <div class="base-modal-confirm__header">
        <span class="base-modal-confirm__title">{{ title }}</span>

        <base-button
          color="#86949E"
          icon="x"
          variant="content-only"

          @click="$emit('close')"
        />
      </div>

      <div class="base-modal-confirm__body">
        <pre class="base-modal-confirm__description">{{ description }}</pre>
      </div>

      <div class="base-modal-confirm__footer">
        <base-button
          :label="confirmLabel"
          class="base-modal-confirm__button"

          @click="$emit('confirm')"
        />
        <base-button
          :label="cancelLabel"
          class="base-modal-confirm__button"

          @click="$emit('cancel')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'BaseModalConfirm',
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    confirmLabel: {
      type: String,
      default: 'Подтвердить'
    },
    cancelLabel: {
      type: String,
      default: 'Отменить'
    }
  }
}
</script>

<style scoped lang="scss">
.base-modal-confirm {
  &__wrapper {
    width: 400px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__title {
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0;
    vertical-align: middle;
  }

  &__description {
    margin: 24px 0;
    white-space: pre-wrap;
  }

  &__footer {
    display: flex;
    column-gap: 16px;
  }
  &__button {
    width: calc(100% / 2 - 16px);
  }
}
</style>
