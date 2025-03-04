<template>
  <div
    ref="draggableContainerRef"
    class="board-draggable-container"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      columnDataAttribute: 'data-draggable-column',
      cardDataAttribute: 'data-draggable-card',
      onDrop: this.onDrop
    })
  },
  methods: {
    ...mapActions('tasks', {
      ActionEditTask: 'editTask'
    }),

    async onDrop (taskId, statusId, queuePosition) {
      const task = {
        status_id: statusId,
        queue_position: queuePosition
      }

      await this.ActionEditTask({ id: taskId, task })
    }
  },
  beforeDestroy () {
    this.dragAndDrop.destroy()
  }
}
</script>

<style scoped lang="scss"></style>
