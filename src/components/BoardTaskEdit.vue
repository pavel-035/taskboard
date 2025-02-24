<template>
  <div class="board-task-edit">
    <div class="board-task-edit__wrapper">
      <base-text-area
        ref="baseTextareaRef"
        v-model="localValue"
        placeholder="Введите текст..."
      />

      <div class="board-task__menu">
        <base-button
          icon="x"
          variant="content-only"
          color="#F53D5C"
          @click="cancel()"
        />
        <base-button
          icon="checkMark"
          variant="content-only"
          color="#22C33D"
          @click="save()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'

export default {
  name: 'BoardTaskEdit',
  components: {
    BaseTextArea,
    BaseButton
  },
  props: {
    value: {
      type: String,
      required: true
    },
    isFocused: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    isFocused: function (newVal) {
      if (newVal) this.$refs.baseTextareaRef.focus()
    }
  },
  created () {
    this.localValue = this.value
  },
  methods: {
    save () {
      this.$emit('save', this.localValue)
    },
    cancel () {
      this.localValue = this.value
      this.$emit('cancel', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.board-task-edit {
  width: 100%;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    padding: 8px;
    border: 1px solid #3D86F4;
    border-radius: 4px;
    background: #FFFFFF;
  }
}
</style>
