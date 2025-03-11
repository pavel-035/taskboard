<template>
  <div class="home">
    <board-draggable-container
      ref="homeWrapperRef"
      class="home__wrapper"
    >
      <board-column
        v-for="status in getTasksByStatuses"
        :key="status.id"

        :status-id="status.id"
        :label="status.label"
        :background-color-header="status.color"

        :tasks="status.tasks"
        class="home__column"
        :style="{
          'width': columnWidth
        }"

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
      columnWidth: null
    }
  },
  async mounted () {
    await this.$nextTick()

    this.columnWidth = this.calculateColumnWidth()

    window.addEventListener('resize', () => {
      this.columnWidth = this.calculateColumnWidth()
    })
  },
  computed: {
    ...mapGetters('statuses', ['getTasksByStatuses'])
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
    },
    calculateColumnWidth () {
      const wrapper = this.$refs.homeWrapperRef.$el
      const wrapperWidth = wrapper.clientWidth
      const windowWidth = document.body.clientWidth
      const columnsPerPage = this.calculateStatusesPerPage(windowWidth)
      const columnGap = 8
      const columnWidth = (wrapperWidth / columnsPerPage) - columnGap

      return columnWidth + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  padding: 52px;
  box-sizing: border-box;
  overflow: hidden;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    column-gap: 8px;

    overflow-x: auto;
    overflow-y: hidden;

    height: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      opacity: 0;
    }
  }
  &__column {
    flex-shrink: 0;
  }
}

@media all and (max-width: $laptop_md)  {
  .home {
    padding: 10px;
  }
}
</style>
