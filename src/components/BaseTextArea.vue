<template>
  <div class="base-textarea">
    <div class="base-textarea__wrapper">
      <textarea
        ref="textareaRef"
        v-model="localValue"
        @input="resizeTextarea"

        v-bind="$attrs"
        class="base-textarea__field"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextArea',
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
  },
  methods: {
    resizeTextarea () {
      this.$nextTick(() => {
        const textareaElement = this.$refs.textareaRef

        textareaElement.style.height = 'auto' // Сбрасываем высоту
        textareaElement.style.height = textareaElement.scrollHeight + 'px' // Устанавливаем новую высоту
      })
    }
  }
}
</script>

<style scoped lang="scss">
.base-textarea {
  width: 100%;
  &__field {
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    resize: none;

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
