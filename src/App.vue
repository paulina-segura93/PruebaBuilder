<template>
  <div id="app" class="app-container">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main content -->
    <div class="main-content">
      <!-- Sidebar -->
      <AppSidebar />
      
      <!-- Router view for different pages -->
      <router-view />
    </div>

    <!-- Footer -->
    <AppFooter />
    
    <!-- Global Notification System -->
    <NotificationSystem />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import NotificationSystem from '@/components/common/NotificationSystem.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    NotificationSystem
  },
  mounted() {
    // Initialize global keyboard shortcuts
    this.initializeGlobalKeyboardShortcuts()
  },
  methods: {
    initializeGlobalKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Ctrl + S to save
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault()
          this.$notify('Use el botón Guardar para guardar los cambios', 'info')
        }
        
        // Escape to clear focus
        if (e.key === 'Escape') {
          const activeElement = document.activeElement
          if (activeElement && activeElement.blur) {
            activeElement.blur()
          }
        }
      })
    }
  }
}
</script>

<style>
@import '@/assets/styles/main.css';
</style>
