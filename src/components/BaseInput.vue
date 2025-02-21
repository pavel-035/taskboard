<template>
  <div class="base-input">
    <div class="base-input__wrapper">
      <input
        v-model="localValue"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.base-input {
  input {
    padding: 0;
    border: none;
    background: transparent;
    &::placeholder {
      color: #86949E;

      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0;
    }
    &:focus-visible {
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
