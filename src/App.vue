<template>
  <div id="app">
    <template v-if="!isLoad">
      <router-view/>
    </template>

    <base-alert-bar />
  </div>
</template>

<script>
import BaseAlertBar from '@/components/BaseAlertBar.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    BaseAlertBar
  },
  data () {
    return {
      isLoad: false
    }
  },
  async created () {
    try {
      this.isLoad = true

      await this.loadTasks()
      await this.loadStatuses()
      this.loadTasksByStatuses()
    } finally {
      this.isLoad = false
    }
  },
  methods: {
    ...mapActions('tasks', ['loadTasks', 'loadTasksByStatuses']),
    ...mapActions('statuses', ['loadStatuses'])
  }
}
</script>
