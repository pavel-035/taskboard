<template>
  <div class="home">
    <board-draggable-container
      class="home__wrapper"
      :style="{
        'width': wrapperWidth
      }"
    >
      <board-column
        v-for="status in getTasksByStatuses"
        :key="status.id"

        :status-id="status.id"
        :label="status.label"
        :background-color-header="status.color"

        :tasks="status.tasks"
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
  data () {
    return {
      statusesPerPage: null
    }
  },
  created () {
    let windowWidth = document.body.clientWidth

    this.statusesPerPage = this.calculateStatusesPerPage(windowWidth)

    window.addEventListener('resize', (event) => {
      windowWidth = document.body.clientWidth

      this.statusesPerPage = this.calculateStatusesPerPage(windowWidth)
    })
  },
  computed: {
    ...mapGetters('statuses', ['getTasksByStatuses']),

    wrapperWidth () {
      const statusesCount = this.getTasksByStatuses.length
      const statusWidth = 100 / this.statusesPerPage
      const width = statusWidth * statusesCount

      return width + '%'
    }
  },
  methods: {
    calculateStatusesPerPage (windowWidth) {
      if (windowWidth >= 1024) {
        return 5
      } else if (windowWidth >= 768) {
        return 4.2
      } else if (windowWidth >= 576) {
        return 3.2
      } else if (windowWidth >= 400) {
        return 2.2
      } else {
        return 1.2
      }
    }
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

@media all and (max-width: $laptop_md)  {
  .home {
    &__wrapper {
      padding: 10px;
    }
  }
}
</style>
