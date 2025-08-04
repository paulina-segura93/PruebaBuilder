<template>
  <main class="content">
    <div class="content-header">
      <h2>Registrar Nueva Causa</h2>
      <p class="subtitle">Ingrese la información básica para crear una nueva causa</p>
    </div>

    <form class="register-form" @submit.prevent="handleSubmit">
      <div class="form-section">
        <h3>Información General</h3>
        <div class="form-grid">
          <FormField
            v-model="formData.rolns"
            label="RolNs"
            type="text"
            required
            @update:modelValue="updateField('rolns', $event)"
          />

          <FormField
            v-model="formData.caratulado"
            label="Carátulado"
            type="text"
            required
            @update:modelValue="updateField('caratulado', $event)"
          />

          <FormField
            v-model="formData.fechaPresentacion"
            label="Fecha presentación"
            type="date"
            required
            @update:modelValue="updateField('fechaPresentacion', $event)"
          />

          <FormField
            v-model="formData.rol"
            label="Rol"
            type="text"
            required
            @update:modelValue="updateField('rol', $event)"
          />

          <FormField
            v-model="formData.procedimiento"
            label="Procedimiento"
            type="select"
            :options="procedimientoOptions"
            required
            @update:modelValue="updateField('procedimiento', $event)"
          />

          <FormField
            v-model="formData.fechaTraslado"
            label="Fecha traslado"
            type="date"
            @update:modelValue="updateField('fechaTraslado', $event)"
          />

          <FormField
            v-model="formData.tribunal"
            label="Tribunal"
            type="select"
            :options="tribunalOptions"
            required
            @update:modelValue="updateField('tribunal', $event)"
          />

          <FormField
            v-model="formData.materias"
            label="Materia(s)"
            type="text"
            required
            @update:modelValue="updateField('materias', $event)"
          />

          <FormField
            v-model="formData.abogado"
            label="Abogado"
            type="text"
            required
            @update:modelValue="updateField('abogado', $event)"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>Información Financiera</h3>
        <div class="form-grid">
          <FormField
            v-model="formData.perjuicioFiscal"
            label="Perjuicio fiscal (Monto reclama)"
            type="number"
            @update:modelValue="updateField('perjuicioFiscal', $event)"
          />

          <FormField
            v-model="formData.causalTER"
            label="Causal TER"
            type="radio"
            :options="siNoOptions"
            @update:modelValue="updateField('causalTER', $event)"
          />

          <FormField
            v-model="formData.estado"
            label="Estado"
            type="select"
            :options="estadoOptions"
            @update:modelValue="updateField('estado', $event)"
          />
        </div>
      </div>

      <div class="form-section">
        <FormField
          v-model="formData.observaciones"
          label="Observaciones iniciales"
          type="textarea"
          :rows="4"
          @update:modelValue="updateField('observaciones', $event)"
        />
      </div>

      <!-- Action buttons -->
      <div class="action-buttons">
        <button 
          type="button" 
          class="btn btn-secondary" 
          @click="handleCancel"
          :disabled="isLoading"
        >
          Cancelar
        </button>
        
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="!isFormValid || isLoading"
          :class="{ loading: isLoading }"
        >
          {{ isLoading ? 'Registrando...' : 'Registrar Causa' }}
        </button>
      </div>
    </form>
  </main>
</template>

<script>
import FormField from '@/components/common/FormField.vue'

export default {
  name: 'RegisterCase',
  components: {
    FormField
  },
  data() {
    return {
      isLoading: false,
      formData: {
        rolns: '',
        caratulado: '',
        fechaPresentacion: '',
        rol: '',
        procedimiento: '',
        fechaTraslado: '',
        tribunal: '',
        materias: '',
        abogado: '',
        perjuicioFiscal: 0,
        causalTER: false,
        estado: 'en-tramitacion',
        observaciones: ''
      },
      // Form options
      procedimientoOptions: [
        { value: '', label: 'Seleccione...' },
        { value: 'general-reclamo', label: 'General de reclamo' },
        { value: 'devoluciones', label: 'Devoluciones' },
        { value: 'multas', label: 'Multas' },
        { value: 'cobranza', label: 'Cobranza' }
      ],
      tribunalOptions: [
        { value: '', label: 'Seleccione...' },
        { value: 'tta-santiago', label: 'TTA de Santiago' },
        { value: 'tta-valparaiso', label: 'TTA de Valparaíso' },
        { value: 'tta-concepcion', label: 'TTA de Concepción' },
        { value: 'tta-la-serena', label: 'TTA de La Serena' },
        { value: 'tta-temuco', label: 'TTA de Temuco' }
      ],
      siNoOptions: [
        { value: false, label: 'No' },
        { value: true, label: 'Sí' }
      ],
      estadoOptions: [
        { value: 'en-tramitacion', label: 'En tramitación' },
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'suspendido', label: 'Suspendido' }
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.formData.rolns && 
             this.formData.caratulado && 
             this.formData.fechaPresentacion &&
             this.formData.rol &&
             this.formData.procedimiento &&
             this.formData.tribunal &&
             this.formData.materias &&
             this.formData.abogado
    }
  },
  methods: {
    updateField(field, value) {
      this.formData[field] = value
    },
    async handleSubmit() {
      if (!this.isFormValid) {
        this.$notify('Por favor complete todos los campos obligatorios', 'error')
        return
      }

      try {
        this.isLoading = true
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Here you would make the actual API call to register the case
        console.log('Registering case:', this.formData)
        
        this.$notify('Causa registrada exitosamente', 'success')
        
        // Redirect to case management view
        this.$router.push('/')
        
      } catch (error) {
        this.$notify('Error al registrar la causa', 'error')
        console.error('Registration error:', error)
      } finally {
        this.isLoading = false
      }
    },
    handleCancel() {
      if (this.hasChanges()) {
        if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/')
      }
    },
    hasChanges() {
      return Object.values(this.formData).some(value => 
        value !== '' && value !== 0 && value !== false
      )
    }
  }
}
</script>

<style scoped>
.content {
  flex: 1;
  padding: 2rem;
  background: white;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 1200px;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1rem;
}

.register-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

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
  background: var(--sii-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--sii-blue-hover);
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

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
