<template>
  <div class="action-buttons">
    <button 
      type="button" 
      class="btn btn-secondary" 
      @click="$emit('cancel')"
      :disabled="isLoading"
    >
      {{ isEditing ? 'Cancelar' : 'Volver' }}
    </button>
    
    <button 
      type="button" 
      :class="['btn', isEditing ? 'btn-secondary' : 'btn-primary']" 
      @click="$emit('edit')"
      :disabled="isLoading"
    >
      {{ isEditing ? 'Cancelar Edición' : 'Editar' }}
    </button>
    
    <button 
      type="button" 
      class="btn btn-success" 
      @click="$emit('save')"
      :disabled="!isEditing || isLoading"
      :class="{ loading: isLoading }"
    >
      {{ isLoading ? 'Guardando...' : 'Guardar' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'edit', 'save']
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f8fafc;
  color: #475569;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f1f5f9;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a67d8;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn.loading {
  color: transparent;
}

.btn.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  color: white;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
