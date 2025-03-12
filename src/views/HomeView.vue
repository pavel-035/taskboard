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
    ...mapGetters('statuses', ['getTasksByStatuses'])
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
    width: calc(100% / 5 - 8px);
    flex-shrink: 0;
  }
}

@media all and (max-width: $laptop_md)  {
  .home {
    padding: 10px;
  }
}

@media all and (max-width: $tablet_lg)  {
  .home {
    &__column {
      width: calc(100% / 4.2 - 8px);
    }
  }
}
@media all and (max-width: $tablet_md)  {
  .home {
    &__column {
      width: calc(100% / 3.2 - 8px);
    }
  }
}
@media all and (max-width: $phone_lg)  {
  .home {
    &__column {
      width: calc(100% / 2.2 - 8px);
    }
  }
}
@media all and (max-width: $phone_sm)  {
  .home {
    &__column {
      width: calc(100% / 1.2 - 8px);
    }
  }
}
</style>
