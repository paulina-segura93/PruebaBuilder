<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.fechaInicio"
          label="Fecha inicio primera instancia"
          type="date"
          @update:modelValue="updateField('fechaInicio', $event)"
        />

        <FormField
          v-model="formData.tribunal"
          label="Tribunal de primera instancia"
          type="text"
          @update:modelValue="updateField('tribunal', $event)"
        />

        <FormField
          v-model="formData.estado"
          label="Estado"
          type="select"
          :options="estadoOptions"
          @update:modelValue="updateField('estado', $event)"
        />

        <FormField
          v-model="formData.fechaResolucion"
          label="Fecha resolución"
          type="date"
          @update:modelValue="updateField('fechaResolucion', $event)"
        />

        <FormField
          v-model="formData.resultado"
          label="Resultado"
          type="select"
          :options="resultadoOptions"
          @update:modelValue="updateField('resultado', $event)"
        />

        <FormField
          v-model="formData.montoResolucion"
          label="Monto resolución"
          type="number"
          @update:modelValue="updateField('montoResolucion', $event)"
        />
      </div>

      <FormField
        v-model="formData.observaciones"
        label="Observaciones"
        type="textarea"
        class="full-width"
        @update:modelValue="updateField('observaciones', $event)"
      />
    </form>
  </div>
</template>

<script>
import FormField from '@/components/common/FormField.vue'

export default {
  name: 'PrimeraInstanciaTab',
  components: {
    FormField
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update-data', 'save-data'],
  data() {
    return {
      formData: {
        fechaInicio: '',
        tribunal: '',
        estado: 'tramitacion',
        fechaResolucion: '',
        resultado: '',
        montoResolucion: 0,
        observaciones: ''
      },
      estadoOptions: [
        { value: 'tramitacion', label: 'En tramitación' },
        { value: 'resuelto', label: 'Resuelto' },
        { value: 'apelado', label: 'Apelado' },
        { value: 'cerrado', label: 'Cerrado' }
      ],
      resultadoOptions: [
        { value: '', label: 'Sin resultado' },
        { value: 'favorable', label: 'Favorable' },
        { value: 'desfavorable', label: 'Desfavorable' },
        { value: 'parcial', label: 'Parcialmente favorable' }
      ]
    }
  },
  watch: {
    data: {
      handler(newData) {
        this.formData = { ...this.formData, ...newData }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateField(field, value) {
      this.formData[field] = value
      this.$emit('update-data', 'primera', this.formData)
    },
    handleSubmit() {
      this.$emit('save-data', this.formData)
    }
  }
}
</script>

<style scoped>
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

.placeholder-content {
  padding: 2rem;
  text-align: center;
  color: #64748b;
}

.placeholder-content h3 {
  color: #1e293b;
  margin-bottom: 1rem;
}

.case-form {
  max-width: 100%;
  text-align: left;
  margin-top: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.full-width {
  grid-column: 1 / -1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
