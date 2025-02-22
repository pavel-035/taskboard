<template>
  <div class="board-task">
    <div
      class="board-task__wrapper"
      :class="{
        'board-task__wrapper_is-edit': isEdit
      }"
    >
      <div
        v-show="!isEdit"
        class="board-task__body"
      >
        <span class="board-task__description">
          {{ task.description }}
        </span>
        <div class="board-task__menu">
          <base-dropdown-menu>
            <template v-slot:activator="{ showMenu, hideMenu, isOpenMenu }">
              <base-button
                @click="showMenu"
                @blur="hideMenu"

                icon="burgerDotes"
                variant="content-only"
                :color="isOpenMenu ? '#3D86F4' : '#86949E'"
                color-hover="#3D86F4"
              />
            </template>

            <template #menu>
              <board-task-menu
                @edit="isEdit = true"
              />
            </template>
          </base-dropdown-menu>
        </div>
      </div>
      <div
        v-show="isEdit"
        class="board-task__body"
      >
        <base-text-area
          v-model="task.description"
          placeholder="Введите текст..."
        />
        <div class="board-task__menu">
          <base-button
            icon="x"
            variant="content-only"
            color="#F53D5C"
          />
          <base-button
            icon="checkMark"
            variant="content-only"
            color="#22C33D"
            @click="isEdit = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseDropdownMenu from '@/components/BaseDropdownMenu.vue'
import BoardTaskMenu from '@/components/BoardTaskMenu.vue'

export default {
  name: 'BoardTask',
  components: {
    BoardTaskMenu,
    BaseDropdownMenu,
    BaseTextArea,
    BaseButton
  },
  data () {
    return {
      isEdit: false,
      task: {
        description: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.board-task {
  &__wrapper {
    cursor: grab;

    padding: 8px;
    border: 1px solid #C4CAD4;
    border-radius: 4px;

    transition: box-shadow ease-in-out .4s;
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
      transition: box-shadow ease-in-out .3s;
    }
    &_is-edit {
      border: 1px solid #3D86F4;
      cursor: auto;
    }
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__menu {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
