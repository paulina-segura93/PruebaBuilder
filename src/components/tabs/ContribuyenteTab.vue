<template>
  <div class="tab-content">
    <form class="case-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <FormField
          v-model="formData.unidadResponsable"
          label="Unidad responsable"
          type="select"
          :options="unidadResponsableOptions"
          @update:modelValue="updateField('unidadResponsable', $event)"
        />

        <FormField
          v-model="formData.fechaContestacion"
          label="Fecha contestación"
          type="date"
          @update:modelValue="updateField('fechaContestacion', $event)"
        />

        <FormField
          v-model="formData.fechaAutoPrueba"
          label="Fecha auto de prueba"
          type="date"
          @update:modelValue="updateField('fechaAutoPrueba', $event)"
        />

        <FormField
          v-model="formData.apoderadosContribuyente"
          label="Apoderados contribuyente"
          type="text"
          @update:modelValue="updateField('apoderadosContribuyente', $event)"
        />

        <FormField
          v-model="formData.existeReclamo"
          label="Existe reclamo"
          type="text"
          @update:modelValue="updateField('existeReclamo', $event)"
        />

        <FormField
          v-model="formData.reclamo"
          label="Reclamo"
          type="text"
          @update:modelValue="updateField('reclamo', $event)"
        />

        <FormField
          v-model="formData.motivoReclamoRecurso"
          label="Motivo reclamo/recurso"
          type="text"
          @update:modelValue="updateField('motivoReclamoRecurso', $event)"
        />

        <FormField
          v-model="formData.fechaSentencia"
          label="Fecha sentencia"
          type="date"
          @update:modelValue="updateField('fechaSentencia', $event)"
        />

        <FormField
          v-model="formData.fechaNotificacion"
          label="Fecha notificación sentencia al contribuyente"
          type="date"
          @update:modelValue="updateField('fechaNotificacion', $event)"
        />

        <FormField
          v-model="formData.decisionSentencia"
          label="Decisión de sentencia"
          type="select"
          :options="decisionSentenciaOptions"
          @update:modelValue="updateField('decisionSentencia', $event)"
        />

        <FormField
          v-model="formData.resultadoSentencia"
          label="Resultado sentencia"
          type="select"
          :options="resultadoSentenciaOptions"
          @update:modelValue="updateField('resultadoSentencia', $event)"
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
          v-model="formData.eventoRelevante"
          label="Evento relevante giro"
          type="select"
          :options="eventoRelevanteOptions"
          @update:modelValue="updateField('eventoRelevante', $event)"
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
        v-model="formData.observacion"
        label="Observación"
        type="textarea"
        class="full-width"
        @update:modelValue="updateField('observacion', $event)"
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
  name: 'ContribuyenteTab',
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
        unidadResponsable: '',
        fechaContestacion: '2023-07-15',
        fechaAutoPrueba: '2023-07-15',
        apoderadosContribuyente: '',
        existeReclamo: '',
        reclamo: '',
        motivoReclamoRecurso: '',
        fechaSentencia: '2023-07-15',
        fechaNotificacion: '2023-07-15',
        decisionSentencia: 'ha-lugar-en-parte',
        resultadoSentencia: 'desfavorable',
        condenaCostas: 'no',
        montoCostas: 0,
        eventoRelevante: 'no',
        suspensionCobro: 'no',
        observacion: ''
      },
      documents: [
        { id: 'sentencia', label: 'Sentencia', file: null },
        { id: 'notificacion', label: 'Notificación sentencia al contribuyente', file: null },
        { id: 'suspension', label: 'Suspensión de cobro', file: null }
      ],
      // Form options
      unidadResponsableOptions: [
        { value: '', label: 'Seleccione...' },
        { value: 'puerto-montt', label: 'X DIRECCIÓN REGIONAL PUERTO MONTT' },
        { value: 'coquimbo', label: 'DIRECCIÓN REGIONAL DE COQUIMBO' },
        { value: 'valparaiso', label: 'DIRECCIÓN REGIONAL DE VALPARAÍSO' }
      ],
      decisionSentenciaOptions: [
        { value: 'ha-lugar-en-parte', label: 'Ha lugar en parte' },
        { value: 'rechaza', label: 'Rechaza' },
        { value: 'acoge', label: 'Acoge' }
      ],
      resultadoSentenciaOptions: [
        { value: 'desfavorable', label: 'Desfavorable' },
        { value: 'favorable', label: 'Favorable' },
        { value: 'favorable-en-parte', label: 'Favorable en parte' }
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
      this.$emit('update-data', 'contribuyente', this.formData)
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
