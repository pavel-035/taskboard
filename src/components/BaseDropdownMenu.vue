<template>
  <div class="base-dropdown">
    <div class="base-dropdown__wrapper">
      <div
        ref="activatorRef"
        class="base-dropdown__activator"
      >
        <slot
          name="activator"
          :show-menu="showMenu"
          :hide-menu="hideMenu"
          :isOpenMenu="isOpenMenu"
        ></slot>
      </div>
      <div
        class="base-dropdown__menu"
        :class="{ 'base-dropdown__menu_active': isOpenMenu }"
      >
        <slot name="menu"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdownMenu',
  data () {
    return {
      isOpenMenu: false
    }
  },
  methods: {
    showMenu () {
      this.isOpenMenu = true
    },
    hideMenu () {
      this.isOpenMenu = false
    }
  }
}
</script>

<style scoped lang="scss">
.base-dropdown {
  &__wrapper {
    position: relative;
  }
  &__menu {
    position: absolute;
    top: 10px;
    right: 0;

    border: 1px solid #E3E5E8;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 8px 16px 0 #0000000F;

    height: 0;
    opacity: 0;
    transition: opacity .3s;

    &_active {
      height: auto;
      opacity: 1;
      transition: opacity .3s;
    }
  }
}
</style>
