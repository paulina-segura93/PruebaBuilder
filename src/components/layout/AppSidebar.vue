<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <a 
        v-for="item in sidebarItems" 
        :key="item.id"
        href="#" 
        class="sidebar-link"
        :class="{ active: activeItem === item.id }"
        @click.prevent="handleSidebarClick(item)"
      >
        <span class="sidebar-icon">{{ item.icon }}</span>
        {{ item.label }}
      </a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      activeItem: 'consultar',
      sidebarItems: [
        { id: 'consultar', label: 'Consultar', icon: '👁️', action: 'view' },
        { id: 'asignar', label: 'Asignar', icon: '👤', action: 'assign' },
        { id: 'editar', label: 'Editar', icon: '✏️', action: 'edit' },
        { id: 'eliminar', label: 'Eliminar', icon: '🗑️', action: 'delete' },
        { id: 'crear', label: 'Crear', icon: '➕', action: 'create' }
      ]
    }
  },
  methods: {
    handleSidebarClick(item) {
      this.activeItem = item.id
      this.$emit('sidebar-action', item.action)
      
      // Announce action for screen readers
      this.announceToScreenReader(`${item.label} seleccionado`)
    },
    announceToScreenReader(message) {
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = message
      
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 1.5rem 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-link:hover,
.sidebar-link.active {
  background-color: var(--sii-blue-light);
  color: var(--sii-blue);
  border-left-color: var(--sii-blue);
}

.sidebar-icon {
  font-size: 1.1rem;
  width: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    order: 2;
  }
  
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0 1rem;
  }
  
  .sidebar-link {
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .sidebar-link:hover,
  .sidebar-link.active {
    border-left: none;
    border-bottom-color: #667eea;
  }
}
</style>
