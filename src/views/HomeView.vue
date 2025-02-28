<template>
  <div class="home">
    <board-draggable-container class="home__wrapper">
      <board-column
        v-for="status in getStatuses"
        :key="status.id"

        :status-id="status.id"
        :label="status.label"
        :background-color-header="status.color"

        :tasks="getTasksByStatuses[status.id]"
        class="home__column"

        :data-draggable-column="status.id"
      />
    </board-draggable-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'
import BoardDraggableContainer from '@/components/BoardDraggableContainer.vue'

export default {
  name: 'HomeView',
  components: {
    BoardDraggableContainer,
    BoardColumn
  },
  computed: {
    ...mapGetters('tasks', ['getTasksByStatuses']),
    ...mapGetters('statuses', ['getStatuses'])
  }
}
</script>

<style scoped lang="scss">
.home {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    column-gap: 8px;

    height: 100vh;
    padding: 52px;
    box-sizing: border-box;
  }
  &__column {
    flex: 1;
  }
}
</style>
