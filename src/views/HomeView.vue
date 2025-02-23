<template>
  <div class="home">
    <div class="home__wrapper">
      <board-column
        v-for="state in getStates"
        :key="state.id"

        :label="state.label"
        :background-color-header="state.color"

        :tasks="getTasksByState(state.id)"
        class="home__column"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  name: 'HomeView',
  components: {
    BoardColumn
  },
  computed: {
    ...mapGetters('tasks', ['getTasksByState']),
    ...mapGetters('states', ['getStates'])
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
