<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.fechaCasacion"
          label="Fecha recurso de casación"
          type="date"
          @update:modelValue="updateField('fechaCasacion', $event)"
        />

        <FormField
          v-model="formData.sala"
          label="Sala"
          type="select"
          :options="salaOptions"
          @update:modelValue="updateField('sala', $event)"
        />

        <FormField
          v-model="formData.estadoCasacion"
          label="Estado casación"
          type="select"
          :options="estadoOptions"
          @update:modelValue="updateField('estadoCasacion', $event)"
        />

        <FormField
          v-model="formData.fechaSentencia"
          label="Fecha sentencia"
          type="date"
          @update:modelValue="updateField('fechaSentencia', $event)"
        />

        <FormField
          v-model="formData.resultadoCasacion"
          label="Resultado casación"
          type="select"
          :options="resultadoOptions"
          @update:modelValue="updateField('resultadoCasacion', $event)"
        />

        <FormField
          v-model="formData.montoFinal"
          label="Monto final"
          type="number"
          @update:modelValue="updateField('montoFinal', $event)"
        />

        <FormField
          v-model="formData.causal"
          label="Causal"
          type="text"
          @update:modelValue="updateField('causal', $event)"
        />

        <FormField
          v-model="formData.ministroRelator"
          label="Ministro relator"
          type="text"
          @update:modelValue="updateField('ministroRelator', $event)"
        />

        <FormField
          v-model="formData.fechaEjecutoria"
          label="Fecha ejecutoria"
          type="date"
          @update:modelValue="updateField('fechaEjecutoria', $event)"
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
  name: 'CorteSupremaTab',
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
        fechaCasacion: '',
        sala: '',
        estadoCasacion: 'tramitacion',
        fechaSentencia: '',
        resultadoCasacion: '',
        montoFinal: 0,
        causal: '',
        ministroRelator: '',
        fechaEjecutoria: '',
        observaciones: ''
      },
      salaOptions: [
        { value: '', label: 'Seleccione...' },
        { value: 'primera', label: 'Primera Sala' },
        { value: 'segunda', label: 'Segunda Sala' },
        { value: 'tercera', label: 'Tercera Sala' },
        { value: 'cuarta', label: 'Cuarta Sala' }
      ],
      estadoOptions: [
        { value: 'tramitacion', label: 'En tramitación' },
        { value: 'resuelto', label: 'Resuelto' },
        { value: 'inadmisible', label: 'Inadmisible' },
        { value: 'cerrado', label: 'Cerrado' }
      ],
      resultadoOptions: [
        { value: '', label: 'Sin resultado' },
        { value: 'acoge', label: 'Acoge' },
        { value: 'rechaza', label: 'Rechaza' },
        { value: 'inadmisible', label: 'Inadmisible' },
        { value: 'desistimiento', label: 'Desistimiento' }
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
      this.$emit('update-data', 'corte', this.formData)
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

.case-form {
  max-width: 100%;
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
