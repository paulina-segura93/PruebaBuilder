<template>
  <teleport to="body">
    <transition-group name="notification" tag="div" class="notification-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
      >
        <span class="notification-message">{{ notification.message }}</span>
        <button 
          class="notification-close" 
          @click="removeNotification(notification.id)"
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
    </transition-group>
  </teleport>
</template>

<script>
export default {
  name: 'NotificationSystem',
  data() {
    return {
      notifications: []
    }
  },
  mounted() {
    // Listen for global notification events
    window.addEventListener('show-notification', this.handleNotificationEvent)
  },
  beforeUnmount() {
    window.removeEventListener('show-notification', this.handleNotificationEvent)
  },
  methods: {
    handleNotificationEvent(event) {
      this.showNotification(event.detail.message, event.detail.type)
    },
    showNotification(message, type = 'info') {
      const id = Date.now() + Math.random()
      const notification = {
        id,
        message,
        type
      }
      
      this.notifications.push(notification)
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        this.removeNotification(id)
      }, 5000)
    },
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  max-width: 400px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-info {
  background: var(--sii-blue-light);
  color: var(--sii-blue);
  border-left: 4px solid var(--sii-blue);
}

.notification-success {
  background: var(--sii-blue-light);
  color: var(--sii-blue);
  border-left: 4px solid var(--sii-blue);
}

.notification-error {
  background: var(--sii-orange-light);
  color: var(--sii-orange);
  border-left: 4px solid var(--sii-orange);
}

.notification-warning {
  background: #fefce8;
  color: #a16207;
  border-left: 4px solid #eab308;
}

.notification-message {
  flex: 1;
  margin-right: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: currentColor;
  opacity: 0.7;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.notification-close:hover {
  opacity: 1;
  background: rgba(0,0,0,0.1);
}

/* Transitions */
.notification-enter-active {
  transition: all 0.3s ease;
}

.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 640px) {
  .notification-container {
    right: 10px;
    left: 10px;
  }
  
  .notification {
    max-width: none;
  }
}
</style>
