<template>
  <div class="base-alert-bar">
    <div class="base-alert-bar__wrapper">
      <transition-group name="alert-bar">
        <base-alert
          v-for="alert in alerts"
          :key="alert.id"

          :description="alert.description"
          :title="alert.title"
          :type="alert.type"

          class="base-alert-bar__element"
          @close="alertClose(alert.id)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue'

export default {
  name: 'BaseAlertBar',
  components: {
    BaseAlert
  },
  data () {
    return {
      alerts: []
    }
  },
  created () {
    this.$root.$on('alert', (alert) => {
      this.alerts.push(alert)

      setTimeout(() => {
        this.alerts.splice(0, 1)
      }, 3000)
    })
  },
  methods: {
    alertClose (alertId) {
      const alertIndex = this.alerts.findIndex(item => item.id === alertId)

      this.alerts.splice(alertIndex, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.base-alert-bar {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;

  width: 40%;
  &__element {
    margin-top: 20px;
  }
}

@media all and (max-width: $laptop_md) {
  .base-alert-bar {
    right: 10px;
    bottom: 10px;

    width: 40%;
    &__element {
      margin-top: 10px;
    }
  }
}
@media all and (max-width: $tablet_md) {
  .base-alert-bar {
    width: 60%;
  }
}
@media all and (max-width: $phone_lg) {
  .base-alert-bar {
    width: 95%;
  }
}

/* Анимация выезда */
.alert-bar-enter-active, .alert-bar-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.alert-bar-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.alert-bar-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.alert-bar-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.alert-bar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
