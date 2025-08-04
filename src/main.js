import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Global properties
app.config.globalProperties.$notify = function(message, type = 'info') {
  // Notification system
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  })
  window.dispatchEvent(event)
}

// Mount app
app.mount('#app')
