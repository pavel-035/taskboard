<template>
  <div
    class="board-column"
    :style="styleVariables"
  >
    <div class="board-column__wrapper">
      <div class="board-column__header">
        <span class="board-column__label">{{ label }}</span>
      </div>

      <div class="board-column__body">
        <div
          v-for="task in tasks"
          :key="task.id"

          class="board-column__task"
        >
          <board-task-edit
            v-if="selectedTask?.id === task.id"

            :value="task.description"
            @save="saveEdit(task, { description: $event })"
            @cancel="cancelEdit"
          />
          <board-task
            v-else

            :description="task.description"
            @edit="taskEdit(task)"
            @delete="taskDelete(task.id)"
          />
        </div>

        <base-task-create
          :status-id="statusId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BoardTask from '@/components/BoardTask.vue'
import BoardTaskEdit from '@/components/BoardTaskEdit.vue'
import BaseTaskCreate from '@/components/BaseTaskCreate.vue'

export default {
  name: 'BoardColumn',
  components: {
    BaseTaskCreate,
    BoardTaskEdit,
    BoardTask
  },
  props: {
    statusId: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    backgroundColorHeader: {
      type: String,
      default: 'transparent'
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedTask: null
    }
  },
  computed: {
    styleVariables () {
      return {
        '--background-color-header': this.backgroundColorHeader
      }
    }
  },
  methods: {
    ...mapActions('tasks', {
      ActionEditTask: 'editTask',
      ActionDeleteTask: 'deleteTask'
    }),

    taskDelete (id) {
      this.ActionDeleteTask(id)
    },
    taskEdit (task) {
      this.selectedTask = { ...task }
    },

    saveEdit (task, editResult) {
      const resultTask = {}

      this.ActionEditTask({ ...task, ...editResult })

      this.ActionEditTask(resultTask)
      this.selectedTask = null
    },
    cancelEdit () {
      this.selectedTask = null
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
    font-size: 14px;
    line-height: 17.5px;
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
  &__task {
    margin-bottom: 8px;
  }
}
</style>
