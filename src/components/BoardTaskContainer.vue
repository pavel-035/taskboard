<template>
  <div class="board-task-container">
    <div class="board-task-container__wrapper">
      <board-task-edit
        v-if="isEdit"

        :value="task.description"
        @save="saveEdit({ description: $event })"
        @cancel="cancelEdit"
      />
      <board-task
        v-else

        :description="task.description"
        @edit="taskEditMode()"
        @delete="taskDelete(task.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoardTaskEdit from '@/components/BoardTaskEdit.vue'
import BoardTask from '@/components/BoardTask.vue'

export default {
  name: 'BoardTaskContainer',
  components: {
    BoardTask,
    BoardTaskEdit
  },
  props: {
    task: {
      type: Object,
      required: true,
      validator: value => ['id', 'description'].every(key => key in value)
    }
  },
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTaskById'])
  },
  methods: {
    ...mapActions('tasks', {
      ActionEditTask: 'editTask',
      ActionDeleteTask: 'deleteTask'
    }),

    async taskDelete (id) {
      const task = this.getTaskById(id)

      try {
        await this.ActionDeleteTask(id)

        this.$alert('success', 'Задача удалена', task.description)
      } catch (error) {
        this.$alert('error', 'Не удалось удалить задачу', task.description)
      }
    },
    taskEditMode () {
      this.isEdit = true
    },
    saveEdit (editResult) {
      this.ActionEditTask({
        id: this.task.id,
        task: editResult
      })

      this.isEdit = false
    },
    cancelEdit () {
      this.isEdit = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
