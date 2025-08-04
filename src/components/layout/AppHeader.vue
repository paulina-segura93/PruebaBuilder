<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F2a2e397d5061489eae69ab6ebf59f09f%2F467c74fdff5f43b2a2cfd2e4e68ed3e7?format=webp&width=800"
          alt="SII - Servicio de Impuestos Internos"
          class="logo-image"
        />
        <h1>Sistema de Gestión de Causas</h1>
      </div>
      <nav class="header-nav">
        <router-link 
          to="/consultar" 
          class="nav-link"
          :class="{ active: $route.name === 'Consultar' || $route.name === 'Home' }"
        >
          Consultar
        </router-link>
        <router-link 
          to="/registrar" 
          class="nav-link"
          :class="{ active: $route.name === 'Registrar' }"
        >
          Registrar
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.header-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  border-bottom: 3px solid transparent;
}

.nav-link.active,
.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
  border-bottom-color: #fff;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .logo h1 {
    font-size: 1.25rem;
  }
}
</style>
