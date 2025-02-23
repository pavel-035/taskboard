<template>
  <div id="app">
    <router-view/>

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
  created () {
    this.fetchTasks()
    this.fetchStates()
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks']),
    ...mapActions('states', ['fetchStates'])
  }
}
</script>
