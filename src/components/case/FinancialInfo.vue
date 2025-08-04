<template>
  <div class="financial-info">
    <div class="financial-row">
      <div class="financial-group">
        <label>Perjuicio fiscal Monto reclama</label>
        <span class="amount">${{ formatCurrency(financialData.perjuicioFiscal) }}</span>
      </div>
      <div class="financial-group">
        <label>Ver Resolución TTA</label>
        <a href="#" class="link" @click.prevent="viewResolution">Ver Resolución TTA</a>
      </div>
      <div class="financial-group">
        <label>Causal TER</label>
        <div class="radio-group">
          <input 
            type="radio" 
            id="causal-si" 
            :value="true"
            v-model="localFinancialData.causalTER"
            @change="updateData"
          >
          <label for="causal-si">SÍ</label>
          <input 
            type="radio" 
            id="causal-no" 
            :value="false"
            v-model="localFinancialData.causalTER"
            @change="updateData"
          >
          <label for="causal-no">NO</label>
        </div>
      </div>
      <div class="financial-group">
        <label>Estado</label>
        <span>{{ financialData.estado }}</span>
      </div>
      <div class="financial-group">
        <label>Giro emitido</label>
        <span>{{ financialData.giroEmitido ? 'SÍ' : 'NO' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinancialInfo',
  props: {
    financialData: {
      type: Object,
      required: true
    }
  },
  emits: ['update-financial'],
  data() {
    return {
      localFinancialData: { ...this.financialData }
    }
  },
  watch: {
    financialData: {
      handler(newData) {
        this.localFinancialData = { ...newData }
      },
      deep: true
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('es-CL').format(amount)
    },
    updateData() {
      this.$emit('update-financial', this.localFinancialData)
    },
    viewResolution() {
      this.$notify('Resolución TTA próximamente disponible', 'info')
    }
  }
}
</script>

<style scoped>
.financial-info {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.financial-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  align-items: center;
}

.financial-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.financial-group label {
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.amount {
  font-weight: 700;
  color: #059669;
  font-size: 1rem;
}

.link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.link:hover {
  text-decoration: underline;
}

.radio-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.radio-group input[type="radio"] {
  margin-right: 0.25rem;
}

.radio-group label {
  font-weight: normal;
  margin: 0;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .financial-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .financial-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .financial-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .financial-group {
    padding: 0.75rem;
    background: white;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }
}
</style>
