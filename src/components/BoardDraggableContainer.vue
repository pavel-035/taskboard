<template>
  <div
    ref="draggableContainerRef"
    class="board-draggable-container">
    <slot></slot>
  </div>
</template>

<script>
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
      container: this.$refs.draggableContainerRef
    })

    // await this.dragAndDrop.onUpdateColumns()
  }
}
</script>

<style scoped lang="scss"></style>
