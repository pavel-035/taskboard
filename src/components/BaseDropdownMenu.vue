<template>
  <div class="base-dropdown">
    <div
      class="base-dropdown__wrapper"
      @focusout="hideMenu"
    >
      <div class="base-dropdown__activator">
        <slot
          name="activator"
          :show-menu="showMenu"
          :isOpenMenu="isOpenMenu"
        ></slot>
      </div>
      <div
        ref="dropdownMenuRef"

        class="base-dropdown__menu"
        :class="{ 'base-dropdown__menu_active': isOpenMenu }"

        @click.capture="hideMenu"
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
    hideMenu ($event) {
      const clickMenuElement = this.$refs.dropdownMenuRef.contains($event.relatedTarget)

      if (!clickMenuElement) this.isOpenMenu = false
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

    z-index: 10;

    border: 1px solid #E3E5E8;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 8px 16px 0 #0000000F;

    visibility: hidden;
    opacity: 0;
    transition: opacity .3s;
    &_active {
      visibility: visible;
      opacity: 1;
      transition: opacity .3s;
    }
  }
}
</style>
