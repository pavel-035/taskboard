<template>
  <div class="board-task">
    <div class="board-task__wrapper">
      <pre class="board-task__description">{{ description }}</pre>

      <base-dropdown-menu class="board-task__menu">
        <template v-slot:activator="{ showMenu, isOpenMenu }">
          <base-button
            @click="showMenu"

            :color="isOpenMenu ? '#3D86F4' : '#86949E'"
            color-hover="#3D86F4"
            icon="burgerDotes"
            variant="content-only"
          />
        </template>

        <template #menu>
          <board-task-menu
            @edit="$emit('edit')"
            @delete="$emit('delete')"
          />
        </template>
      </base-dropdown-menu>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseDropdownMenu from '@/components/BaseDropdownMenu.vue'
import BoardTaskMenu from '@/components/BoardTaskMenu.vue'

export default {
  name: 'BoardTask',
  components: {
    BoardTaskMenu,
    BaseDropdownMenu,
    BaseButton
  },
  props: {
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.board-task {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 8px;
    z-index: 1;

    padding: 8px;
    border: 1px solid #C4CAD4;
    border-radius: 4px;
    background: #FFFFFF;

    transition: box-shadow ease-in-out .4s;
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
      transition: box-shadow ease-in-out .3s;
    }
  }
  &__description {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
