<template>
  <div class="case-info-grid">
    <div class="case-info-row">
      <div class="info-group">
        <label>RolNs</label>
        <span>{{ caseData.rolns }}</span>
      </div>
      <div class="info-group">
        <label>Carátulado</label>
        <span>{{ caseData.caratulado }}</span>
      </div>
      <div class="info-group">
        <label>Fecha presentación</label>
        <span>📅 {{ formatDate(caseData.fechaPresentacion) }}</span>
      </div>
    </div>

    <div class="case-info-row">
      <div class="info-group">
        <label>Rol</label>
        <span>{{ caseData.rol }}</span>
      </div>
      <div class="info-group">
        <label>Procedimiento</label>
        <span>{{ caseData.procedimiento }}</span>
      </div>
      <div class="info-group">
        <label>Fecha traslado</label>
        <span>📅 {{ formatDate(caseData.fechaTraslado) }}</span>
      </div>
    </div>

    <div class="case-info-row">
      <div class="info-group">
        <label>Tribunal</label>
        <span>{{ caseData.tribunal }}</span>
      </div>
      <div class="info-group">
        <label>Materia(s)</label>
        <span>{{ caseData.materias }}</span>
      </div>
      <div class="info-group">
        <label>Abogado</label>
        <span>{{ caseData.abogado }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseInfoGrid',
  props: {
    caseData: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.case-info-grid {
  margin-bottom: 2rem;
}

.case-info-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.case-info-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-group label {
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.info-group span {
  color: #1e293b;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .case-info-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .case-info-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .info-group {
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }
}
</style>
