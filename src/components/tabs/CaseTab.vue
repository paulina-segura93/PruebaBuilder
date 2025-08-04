<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.rutContribuyente"
          label="RUT del contribuyente"
          type="text"
          placeholder="12.345.678-9"
          @update:modelValue="updateField('rutContribuyente', $event)"
        />

        <FormField
          v-model="formData.nombreContribuyente"
          label="Nombre del contribuyente"
          type="text"
          @update:modelValue="updateField('nombreContribuyente', $event)"
        />

        <FormField
          v-model="formData.fechaPresentacion"
          label="Fecha presentación"
          type="date"
          @update:modelValue="updateField('fechaPresentacion', $event)"
        />

        <FormField
          v-model="formData.fechaTramite"
          label="Fecha tramite"
          type="date"
          @update:modelValue="updateField('fechaTramite', $event)"
        />

        <FormField
          v-model="formData.abogado"
          label="Abogado"
          type="text"
          @update:modelValue="updateField('abogado', $event)"
        />

        <FormField
          v-model="formData.causaTER"
          label="Causa TER"
          type="select"
          :options="causaTEROptions"
          @update:modelValue="updateField('causaTER', $event)"
        />

        <FormField
          v-model="formData.estado"
          label="Estado"
          type="select"
          :options="estadoOptions"
          @update:modelValue="updateField('estado', $event)"
        />

        <FormField
          v-model="formData.giroEmitido"
          label="Giro emitido"
          type="select"
          :options="giroEmitidoOptions"
          @update:modelValue="updateField('giroEmitido', $event)"
        />
      </div>

      <FormField
        v-model="formData.observaciones"
        label="Observaciones"
        type="textarea"
        class="full-width"
        @update:modelValue="updateField('observaciones', $event)"
      />

      <!-- Document upload section -->
      <DocumentUpload
        :documents="documents"
        @upload="handleDocumentUpload"
        @remove="handleDocumentRemove"
      />
    </form>
  </div>
</template>

<script>
import FormField from '@/components/common/FormField.vue'
import DocumentUpload from '@/components/common/DocumentUpload.vue'

export default {
  name: 'CaseTab',
  components: {
    FormField,
    DocumentUpload
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
        tipoRecurso: 'apelacion',
        fechaInterposicion: '2023-07-15',
        motivoReclamo: '',
        corte: 'corte-suprema',
        apoderados: '',
        fechaSentencia: '2023-07-15',
        decisionSentencia: 'ha-lugar-en-parte',
        recurrente: 'ambos',
        resultadoSentencia: 'favorable-en-parte',
        condenaCostas: 'no',
        montoCostas: 0,
        eventoRelevante: 'no',
        suspensionCobro: 'no',
        observaciones: ''
      },
      documents: [
        { id: 'sentencia', label: 'Sentencia', file: null },
        { id: 'suspension', label: 'Suspensión de cobro', file: null }
      ],
      // Form options
      tipoRecursoOptions: [
        { value: 'apelacion', label: 'Apelación' },
        { value: 'casacion', label: 'Casación' },
        { value: 'queja', label: 'Queja' }
      ],
      motivoReclamoOptions: [
        { value: '', label: 'No seleccionado' },
        { value: 'devolucion', label: 'Devolución' },
        { value: 'multa', label: 'Multa' }
      ],
      corteOptions: [
        { value: 'corte-suprema', label: 'Corte Suprema' },
        { value: 'corte-apelaciones', label: 'Corte de Apelaciones' }
      ],
      decisionSentenciaOptions: [
        { value: 'ha-lugar-en-parte', label: 'Ha lugar en parte' },
        { value: 'rechaza', label: 'Rechaza' },
        { value: 'acoge', label: 'Acoge' }
      ],
      recurrenteOptions: [
        { value: 'ambos', label: 'Ambos' },
        { value: 'contribuyente', label: 'Contribuyente' },
        { value: 'sii', label: 'SII' }
      ],
      resultadoSentenciaOptions: [
        { value: 'favorable-en-parte', label: 'Favorable en parte' },
        { value: 'favorable', label: 'Favorable' },
        { value: 'desfavorable', label: 'Desfavorable' }
      ],
      condenaCostasOptions: [
        { value: 'no', label: 'No' },
        { value: 'si', label: 'Sí' }
      ],
      eventoRelevanteOptions: [
        { value: 'no', label: 'No' },
        { value: 'si', label: 'Sí' }
      ],
      suspensionCobroOptions: [
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
      this.$emit('update-data', 'caso', this.formData)
    },
    handleSubmit() {
      this.$emit('save-data', this.formData)
    },
    handleDocumentUpload(documentId, file) {
      const document = this.documents.find(d => d.id === documentId)
      if (document) {
        document.file = file
        this.$notify(`Documento ${document.label} cargado correctamente`, 'success')
      }
    },
    handleDocumentRemove(documentId) {
      const document = this.documents.find(d => d.id === documentId)
      if (document) {
        document.file = null
        this.$notify(`Documento ${document.label} eliminado`, 'info')
      }
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
