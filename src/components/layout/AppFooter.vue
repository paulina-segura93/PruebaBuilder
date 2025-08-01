<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="user-info">
        <div class="user-avatar">{{ userInitial }}</div>
        <div class="user-details">
          <span class="user-name">{{ currentUser.name }}</span>
          <span class="user-profile" @click="viewProfile">Ver perfil</span>
        </div>
        <button class="settings-btn" @click="openSettings" :title="'Configuración'">
          ⚙️
        </button>
      </div>
      <div class="footer-branding">
        Made with <span class="logo-small">Builder.io</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentUser: {
        name: 'Amanda',
        email: 'amanda@example.com'
      }
    }
  },
  computed: {
    userInitial() {
      return this.currentUser.name.charAt(0).toUpperCase()
    }
  },
  methods: {
    viewProfile() {
      this.$notify('Funcionalidad de perfil próximamente', 'info')
    },
    openSettings() {
      this.$notify('Configuración próximamente', 'info')
    }
  }
}
</script>

<style scoped>
.footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.user-profile {
  color: #64748b;
  font-size: 0.75rem;
  cursor: pointer;
  transition: color 0.2s;
}

.user-profile:hover {
  color: #667eea;
}

.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.settings-btn:hover {
  background: #f1f5f9;
}

.footer-branding {
  color: #64748b;
  font-size: 0.75rem;
}

.logo-small {
  color: #667eea;
  font-weight: 600;
}
</style>
