<template>
  <button
    :class="[
      'base-button',
      `base-button_${variant}`
    ]"
    :style="styleVariables"

    type="button"
    @click="$emit('click', $event)"
  >
    <base-icon
      v-if="icon"
      :icon="icon"
      class="base-button__icon"
    />
    <span
      v-if="label"
      class="base-button__label"
    >
      {{ label }}
    </span>
  </button>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseButton',
  components: { BaseIcon },
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#000'
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'content-only'].includes(value)
    }
  },
  computed: {
    styleVariables () {
      return {
        '--color': this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  column-gap: 8px;
  align-items: center;

  cursor: pointer;

  padding: 9px;
  border: 1px solid #C4CAD4;
  border-radius: 4px;

  background-color: #fff;

  color: var(--color);

  transition: box-shadow ease-in-out .4s;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
    transition: box-shadow ease-in-out .3s;
  }

  &_content-only {
    padding: 0;
    border: none;
    background-color: transparent;
    &:hover {
      box-shadow: none;
    }
  }

  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0;
  }
  &__icon {
    margin-top: 3px;
    fill: currentColor;
    stroke: currentColor;
  }
}
</style>
