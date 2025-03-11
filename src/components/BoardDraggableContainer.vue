<template>
  <div
    ref="draggableContainerRef"
    class="board-draggable-container"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DragAndDrop from '@/plugins/dragAndDrop'

export default {
  name: 'BoardDraggableContainer',
  data () {
    return {
      dragAndDrop: null
    }
  },
  mounted () {
    this.dragAndDrop = new DragAndDrop({
      container: this.$refs.draggableContainerRef,
      cardDataAttribute: 'data-draggable-card',
      columnDataAttribute: 'data-draggable-column',
      scrollDataAttribute: 'data-draggable-column-scroll',
      onDrop: this.onDrop
    })
  },
  computed: {
    ...mapGetters('statuses', ['getStatusByID']),
    ...mapGetters('tasks', ['getTaskById'])
  },
  methods: {
    ...mapActions('tasks', {
      ActionEditOrder: 'editOrder'
    }),

    async onDrop (taskId, statusId, order) {
      const status = this.getStatusByID(statusId)
      const editableTask = this.getTaskById(taskId)

      try {
        this.dragAndDrop.disable = true

        const task = {
          status_id: statusId,
          order
        }

        await this.ActionEditOrder({ id: taskId, task })
        this.$alert('success', `Задача перемещена в "${status.label}"`, editableTask.description)
      } catch (error) {
        this.$alert('error', `Не удалось переместить задачу в "${status.label}"`, editableTask.description)
      } finally {
        this.dragAndDrop.disable = false
      }
    }
  },
  beforeDestroy () {
    this.dragAndDrop.destroy()
  }
}
</script>

<style scoped lang="scss"></style>
