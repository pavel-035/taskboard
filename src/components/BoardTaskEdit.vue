<template>
  <div
    ref="boardTaskEditRef"
    class="board-task-edit"
  >
    <div
      class="board-task-edit__wrapper"
      @focusout="dropEdit"
    >
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
          @click.capture="cancel()"
        />
        <base-button
          icon="checkMark"
          variant="content-only"
          color="#22C33D"
          @click.capture="save()"
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
      default: ''
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  created () {
    this.localValue = this.value
  },
  async mounted () {
    await this.$nextTick()
    this.$refs.baseTextareaRef.focus()
  },
  methods: {
    save () {
      if (!this.localValue) {
        this.$alert('error', 'Нельзя сохранить пустое значение')
        this.$refs.baseTextareaRef.focus()
        return
      }
      this.$emit('save', this.localValue)
    },
    cancel () {
      this.localValue = this.value
      this.$emit('cancel', this.value)
    },
    dropEdit ($event) {
      const clickTaskElement = this.$refs.boardTaskEditRef.contains($event.relatedTarget)

      if ($event.target.tagName === 'TEXTAREA' && !clickTaskElement) {
        this.$modal({
          slot: 'BaseModalConfirm',
          slotProps: {
            title: 'Сохранить изменения?',
            description: this.localValue,
            confirmLabel: 'Сохранить изменения',
            cancelConfirm: 'Отменить изменения'
          },

          onConfirm: this.save,
          onCancel: this.cancel,
          onClose: this.$refs.baseTextareaRef.focus
        })
      }
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
