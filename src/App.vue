<template>
  <div id="app">
    <base-loader v-if="isLoading" />

    <template v-if="!isLoading">
      <router-view/>
    </template>

    <base-alert-bar />
    <base-modal-container />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseModalContainer from '@/components/BaseModalContainer.vue'
import BaseAlertBar from '@/components/BaseAlertBar.vue'
import BaseLoader from '@/components/BaseLoader.vue'

export default {
  name: 'App',
  components: {
    BaseLoader,
    BaseAlertBar,
    BaseModalContainer
  },
  computed: {
    ...mapGetters('loader', ['isLoading'])
  },
  async created () {
    try {
      await this.ActionLoadTasks()
      await this.ActionLoadStatuses()
      await this.ActionLoadTasksByStatuses()
    } catch (error) {
      console.error(error)
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
