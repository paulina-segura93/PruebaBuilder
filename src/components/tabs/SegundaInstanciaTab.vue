<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.fechaApelacion"
          label="Fecha apelación"
          type="date"
          @update:modelValue="updateField('fechaApelacion', $event)"
        />

        <FormField
          v-model="formData.corteApelaciones"
          label="Corte de Apelaciones"
          type="select"
          :options="corteOptions"
          @update:modelValue="updateField('corteApelaciones', $event)"
        />

        <FormField
          v-model="formData.estadoApelacion"
          label="Estado apelación"
          type="select"
          :options="estadoOptions"
          @update:modelValue="updateField('estadoApelacion', $event)"
        />

        <FormField
          v-model="formData.fechaSentencia"
          label="Fecha sentencia"
          type="date"
          @update:modelValue="updateField('fechaSentencia', $event)"
        />

        <FormField
          v-model="formData.resultadoApelacion"
          label="Resultado apelación"
          type="select"
          :options="resultadoOptions"
          @update:modelValue="updateField('resultadoApelacion', $event)"
        />

        <FormField
          v-model="formData.montoSentencia"
          label="Monto sentencia"
          type="number"
          @update:modelValue="updateField('montoSentencia', $event)"
        />

        <FormField
          v-model="formData.recurreCasacion"
          label="Recurre casación"
          type="select"
          :options="siNoOptions"
          @update:modelValue="updateField('recurreCasacion', $event)"
        />

        <FormField
          v-model="formData.fechaCasacion"
          label="Fecha casación"
          type="date"
          @update:modelValue="updateField('fechaCasacion', $event)"
        />

        <FormField
          v-model="formData.motivoCasacion"
          label="Motivo casación"
          type="text"
          @update:modelValue="updateField('motivoCasacion', $event)"
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
  name: 'SegundaInstanciaTab',
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
        fechaApelacion: '',
        corteApelaciones: '',
        estadoApelacion: 'tramitacion',
        fechaSentencia: '',
        resultadoApelacion: '',
        montoSentencia: 0,
        recurreCasacion: 'no',
        fechaCasacion: '',
        motivoCasacion: '',
        observaciones: ''
      },
      corteOptions: [
        { value: '', label: 'Seleccione...' },
        { value: 'santiago', label: 'Corte de Apelaciones de Santiago' },
        { value: 'valparaiso', label: 'Corte de Apelaciones de Valparaíso' },
        { value: 'concepcion', label: 'Corte de Apelaciones de Concepción' },
        { value: 'la-serena', label: 'Corte de Apelaciones de La Serena' }
      ],
      estadoOptions: [
        { value: 'tramitacion', label: 'En tramitación' },
        { value: 'resuelto', label: 'Resuelto' },
        { value: 'casacion', label: 'En casación' },
        { value: 'cerrado', label: 'Cerrado' }
      ],
      resultadoOptions: [
        { value: '', label: 'Sin resultado' },
        { value: 'confirma', label: 'Confirma' },
        { value: 'revoca', label: 'Revoca' },
        { value: 'modifica', label: 'Modifica' },
        { value: 'anula', label: 'Anula' }
      ],
      siNoOptions: [
        { value: 'no', label: 'No' },
        { value: 'si', label: 'Sí' }
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
      this.$emit('update-data', 'segunda', this.formData)
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
