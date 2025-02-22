<template>
  <div class="board-task-menu">
    <ul class="board-task-menu__wrapper">
      <li
        v-for="(element, index) in menuList"
        :key="index"

        class="board-task-menu__item"
      >
        <base-button
          :label="element.label"
          :icon="element.icon"
          color="#86949E"
          variant="content-only"

          @click="element.onclick()"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'BoardTaskMenu',
  components: {
    BaseButton
  },
  data () {
    return {
      menuList: [
        {
          icon: 'edit',
          label: 'Редактировать',
          onclick: () => this.$emit('edit')
        },
        {
          icon: 'trash',
          label: 'Удалить',
          onclick: () => this.$emit('delete')
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.board-task-menu {
  &__wrapper {
    padding: 8px 0;
    margin: 0;
  }
  &__item {
    cursor: pointer;
    padding: 6px 10px;
    list-style: none;
    transition: all .2s;
    &:hover {
      background-color: #E1F1FF;
      transition: all .2s;
    }
  }
}
</style>
