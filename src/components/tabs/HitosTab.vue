<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.tipoRecurso"
          label="Tipo recurso"
          type="select"
          :options="tipoRecursoOptions"
          @update:modelValue="updateField('tipoRecurso', $event)"
        />

        <FormField
          v-model="formData.libro"
          label="Libro"
          type="text"
          @update:modelValue="updateField('libro', $event)"
        />

        <FormField
          v-model="formData.fechaInterposicion"
          label="Fecha interposición"
          type="date"
          @update:modelValue="updateField('fechaInterposicion', $event)"
        />

        <FormField
          v-model="formData.motivoReclamo"
          label="Motivo reclamo"
          type="text"
          @update:modelValue="updateField('motivoReclamo', $event)"
        />

        <FormField
          v-model="formData.apoderadosContribuyente"
          label="Apoderados contribuyente"
          type="text"
          @update:modelValue="updateField('apoderadosContribuyente', $event)"
        />

        <FormField
          v-model="formData.decisionSentencia"
          label="Decisión de sentencia"
          type="select"
          :options="decisionSentenciaOptions"
          @update:modelValue="updateField('decisionSentencia', $event)"
        />

        <FormField
          v-model="formData.recurrente"
          label="Recurrente"
          type="select"
          :options="recurrenteOptions"
          @update:modelValue="updateField('recurrente', $event)"
        />

        <FormField
          v-model="formData.resultadoSentencia"
          label="Resultado sentencia"
          type="select"
          :options="resultadoSentenciaOptions"
          @update:modelValue="updateField('resultadoSentencia', $event)"
        />

        <FormField
          v-model="formData.eventoRelevante"
          label="Evento relevante giro"
          type="select"
          :options="eventoRelevanteOptions"
          @update:modelValue="updateField('eventoRelevante', $event)"
        />

        <FormField
          v-model="formData.condenaCostas"
          label="Condena en costas"
          type="select"
          :options="condenaCostasOptions"
          @update:modelValue="updateField('condenaCostas', $event)"
        />

        <FormField
          v-model="formData.montoCostas"
          label="Monto costas"
          type="number"
          @update:modelValue="updateField('montoCostas', $event)"
        />

        <FormField
          v-model="formData.suspensionCobro"
          label="Suspensión de cobro"
          type="select"
          :options="suspensionCobroOptions"
          @update:modelValue="updateField('suspensionCobro', $event)"
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
  name: 'HitosTab',
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
        libro: 'Tributario y aduanero - Art',
        fechaInterposicion: '2023-07-15',
        motivoReclamo: '',
        apoderadosContribuyente: '',
        decisionSentencia: 'ha-lugar-en-parte',
        recurrente: 'ambos',
        resultadoSentencia: 'favorable-en-parte',
        eventoRelevante: 'no',
        condenaCostas: 'no',
        montoCostas: 0,
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
      eventoRelevanteOptions: [
        { value: 'no', label: 'No' },
        { value: 'si', label: 'Sí' }
      ],
      condenaCostasOptions: [
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
      this.$emit('update-data', 'hitos', this.formData)
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
