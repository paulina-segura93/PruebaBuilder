<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.rutContribuyente"
          label="RUT del contribuyente"
          type="text"
          placeholder="10.222.222-3"
          @update:modelValue="updateField('rutContribuyente', $event)"
        />

        <FormField
          v-model="formData.nombreContribuyente"
          label="Nombre del contribuyente"
          type="text"
          placeholder="Juan Pérez"
          @update:modelValue="updateField('nombreContribuyente', $event)"
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
        rutContribuyente: '',
        nombreContribuyente: '',
        observaciones: ''
      },
      documents: [
        { id: 'acto-reclamado', label: 'Acto Reclamado', file: null },
        { id: 'otros-documentos', label: 'Otros documentos', file: null },
        { id: 'archivo-aca', label: 'Archivo ACA', file: null }
      ],
      // Form options
      causaTEROptions: [
        { value: '', label: 'Seleccionar...' },
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' }
      ],
      estadoOptions: [
        { value: 'en-tramitacion', label: 'En tramitación' },
        { value: 'resuelto', label: 'Resuelto' },
        { value: 'archivado', label: 'Archivado' },
        { value: 'suspendido', label: 'Suspendido' }
      ],
      giroEmitidoOptions: [
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
