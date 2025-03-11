<template>
  <div class="base-alert">
    <div
      class="base-alert__wrapper"
      :class="`base-alert__wrapper_${type}`"
    >
      <base-icon
        class="base-alert__icon"
        :icon="iconNameByType[this.type]"
      />
      <div class="base-alert__body">
        <span class="base-alert__title">
          {{ title }}
        </span>
        <pre class="base-alert__description">{{ localDescription }}</pre>
      </div>
      <base-button
        class="base-alert__close"
        icon="x"
        color="#86949E"
        variant="content-only"

        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseAlert',
  components: {
    BaseIcon,
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
    type: {
      type: String,
      required: true,
      validator: value => ['success', 'info', 'warning', 'error'].includes(value)
    }
  },
  data () {
    return {
      iconNameByType: {
        success: 'success',
        error: 'error'
      }
    }
  },
  computed: {
    localDescription () {
      const maxLength = 100
      const maxLines = 3

      const description = this.description
      const descriptionByLine = this.description.split('\n')
      const result = this.description
        .split('\n')
        .slice(0, maxLines)
        .join('\n')
        .substring(0, maxLength)

      if (description.length > maxLength || descriptionByLine.length > maxLines) {
        return result + '...'
      }
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.base-alert {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    padding: 12px;

    background: #FFFFFF;
    border: 1px solid #E3E5E8;
    border-radius: 4px;

    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);

    &_success {
      border-left: 8px solid #22C33D;
    }
    &_error {
      border-left: 8px solid #F53D5C;
    }
  }
  &__icon {
    padding: 4px;
  }
  &__body {
    flex: 1;
    padding: 4px 0;
    margin: 0 12px;
  }
  &__title {
    color: #1C2530;
    font-weight: bold;
    font-size: 14px;
    line-height: 17.5px;
    letter-spacing: 0;
  }
  &__description {
    margin: 8px 0 0;
    padding: 0;

    white-space: pre-wrap;
    overflow-wrap: anywhere;

    color: #1C2530;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0;
  }
}
</style>
