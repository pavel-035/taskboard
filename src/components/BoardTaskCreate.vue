<template>
  <div class="base-task-create">
    <div class="base-task-create__wrapper">
      <board-task-edit
        v-if="isCreate"

        value=""
        @save="save"
        @cancel="cancel"
      />
      <base-button
        v-else
        label="Добавить"
        icon="plus"
        color="#3D86F4"
        variant="content-only"

        @click="isCreate = true"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BoardTaskEdit from '@/components/BoardTaskEdit.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'BoardTaskCreate',
  components: {
    BaseButton,
    BoardTaskEdit
  },
  props: {
    statusId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isCreate: false
    }
  },
  methods: {
    ...mapActions('tasks', ['createTask']),

    save (description) {
      this.createTask({
        description,
        status_id: this.statusId
      })

      this.isCreate = false
    },
    cancel () {
      this.isCreate = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
