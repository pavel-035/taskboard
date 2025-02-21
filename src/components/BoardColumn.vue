<template>
  <div
    class="board-column"
    :style="styleVariables"
  >
    <div class="board-column__wrapper">
      <div class="board-column__header">
        <span class="board-column__label">
          {{ label }}
        </span>
      </div>
      <div class="board-column__body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardColumn',
  props: {
    label: {
      type: String,
      required: true
    },
    backgroundColorHeader: {
      type: String,
      default: 'transparent'
    }
  },
  computed: {
    styleVariables () {
      return {
        '--background-color-header': this.backgroundColorHeader
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.board-column {
  height: 100%;
  &__wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;

    border: 1px solid #E3E5E8;
    border-radius: 8px;
  }

  &__header {
    padding: 7px;
    text-align: center;
    background-color: var(--background-color-header);
  }
  &__label {
    color: #1C2530;
    font-weight: bold;
  }

  &__body {
    flex: 1;
    overflow-y: auto;

    padding: 8px;
    background: #F7F7F7;

    &::-webkit-scrollbar {
      width: 14px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      cursor: pointer;

      border: 4px solid transparent;
      border-radius: 10px;
      background-clip: padding-box;
      background-color: rgba(196, 202, 212, 0.7);
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(196, 202, 212, 1);
    }
  }
}
</style>
