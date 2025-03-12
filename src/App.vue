<template>
  <div id="app">
    <template v-if="!isLoad">
      <router-view/>
    </template>

    <base-alert-bar />
    <base-modal-container />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import BaseModalContainer from '@/components/BaseModalContainer.vue'
import BaseAlertBar from '@/components/BaseAlertBar.vue'

export default {
  name: 'App',
  components: {
    BaseAlertBar,
    BaseModalContainer
  },
  data () {
    return {
      isLoad: false
    }
  },
  async created () {
    try {
      this.isLoad = true

      await this.ActionLoadTasks()
      await this.ActionLoadStatuses()
      await this.ActionLoadTasksByStatuses()
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoad = false
    }
  },
  methods: {
    ...mapActions('tasks', {
      ActionLoadTasks: 'loadTasks'
    }),
    ...mapActions('statuses', {
      ActionLoadTasksByStatuses: 'loadTasksByStatuses',
      ActionLoadStatuses: 'loadStatuses'
    })
  }
}
</script>
