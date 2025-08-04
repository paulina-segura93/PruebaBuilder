<template>
  <main class="content">
    <div class="content-header">
      <h2>Causa</h2>
    </div>

    <!-- Case information grid -->
    <CaseInfoGrid :case-data="caseData" />

    <!-- Financial information -->
    <FinancialInfo :financial-data="financialData" @update-financial="updateFinancialData" />

    <!-- Tab container -->
    <div class="tab-container">
      <nav class="tab-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="setActiveTab(tab.id)"
          @keydown="handleTabKeydown($event, tab.id)"
        >
          {{ tab.label }}
        </button>
      </nav>

      <!-- Tab content -->
      <div class="tab-content-container">
        <component 
          :is="currentTabComponent" 
          :data="getTabData(activeTab)"
          @update-data="updateTabData"
          @save-data="saveTabData"
        />
      </div>
    </div>

    <!-- Action buttons -->
    <ActionButtons 
      @cancel="handleCancel"
      @edit="handleEdit"
      @save="handleSave"
      :is-editing="isEditing"
      :is-loading="isLoading"
    />
  </main>
</template>

<script>
import CaseInfoGrid from '@/components/case/CaseInfoGrid.vue'
import FinancialInfo from '@/components/case/FinancialInfo.vue'
import ActionButtons from '@/components/common/ActionButtons.vue'
import CaseTab from '@/components/tabs/CaseTab.vue'
import ContribuyenteTab from '@/components/tabs/ContribuyenteTab.vue'
import HitosTab from '@/components/tabs/HitosTab.vue'
import PrimeraInstanciaTab from '@/components/tabs/PrimeraInstanciaTab.vue'
import SegundaInstanciaTab from '@/components/tabs/SegundaInstanciaTab.vue'
import CorteSupremaTab from '@/components/tabs/CorteSupremaTab.vue'

export default {
  name: 'CaseManagement',
  components: {
    CaseInfoGrid,
    FinancialInfo,
    ActionButtons,
    CaseTab,
    ContribuyenteTab,
    HitosTab,
    PrimeraInstanciaTab,
    SegundaInstanciaTab,
    CorteSupremaTab
  },
  data() {
    return {
      activeTab: 'caso',
      isEditing: false,
      isLoading: false,
      tabs: [
        { id: 'caso', label: 'Caso', component: 'CaseTab' },
        { id: 'contribuyente', label: 'Contribuyente', component: 'ContribuyenteTab' },
        { id: 'hitos', label: 'Hitos', component: 'HitosTab' },
        { id: 'primera', label: 'Primera instancia', component: 'PrimeraInstanciaTab' },
        { id: 'segunda', label: 'Segunda instancia', component: 'SegundaInstanciaTab' },
        { id: 'corte', label: 'Corte suprema', component: 'CorteSupremaTab' }
      ],
      caseData: {
        rolns: 'DR-59-00096-2023',
        caratulado: 'SI DIRECCIÓN REGIONAL DE COQUIMBO / MENA',
        fechaPresentacion: '2023-07-15T12:20:05',
        rol: '23-9-000652-7',
        procedimiento: 'General de reclamo',
        fechaTraslado: '2023-07-15T12:20:05',
        tribunal: 'TTA de La Serena',
        materias: 'Devolución de impuestos',
        abogado: 'José Espinoza'
      },
      financialData: {
        perjuicioFiscal: 40000000,
        causalTER: true,
        estado: 'En tramitación',
        giroEmitido: false
      },
      tabsData: {
        caso: {},
        contribuyente: {},
        hitos: {},
        primera: {},
        segunda: {},
        corte: {}
      }
    }
  },
  computed: {
    currentTabComponent() {
      const tab = this.tabs.find(t => t.id === this.activeTab)
      return tab ? tab.component : 'CaseTab'
    }
  },
  mounted() {
    this.initializeKeyboardShortcuts()
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId
      this.announceTabChange(tabId)
    },
    handleTabKeydown(event, tabId) {
      const currentIndex = this.tabs.findIndex(t => t.id === tabId)
      let targetIndex
      
      switch(event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          targetIndex = currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1
          this.setActiveTab(this.tabs[targetIndex].id)
          this.$nextTick(() => {
            document.querySelector(`[data-tab="${this.tabs[targetIndex].id}"]`)?.focus()
          })
          break
        case 'ArrowRight':
          event.preventDefault()
          targetIndex = currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1
          this.setActiveTab(this.tabs[targetIndex].id)
          this.$nextTick(() => {
            document.querySelector(`[data-tab="${this.tabs[targetIndex].id}"]`)?.focus()
          })
          break
        case 'Home':
          event.preventDefault()
          this.setActiveTab(this.tabs[0].id)
          break
        case 'End':
          event.preventDefault()
          this.setActiveTab(this.tabs[this.tabs.length - 1].id)
          break
      }
    },
    getTabData(tabId) {
      return this.tabsData[tabId] || {}
    },
    updateTabData(tabId, data) {
      this.tabsData[tabId] = { ...this.tabsData[tabId], ...data }
    },
    updateFinancialData(data) {
      this.financialData = { ...this.financialData, ...data }
    },
    saveTabData(data) {
      this.updateTabData(this.activeTab, data)
      this.handleSave()
    },
    handleCancel() {
      if (this.isEditing && this.hasUnsavedChanges()) {
        if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
          this.isEditing = false
          this.reloadData()
        }
      } else {
        this.$router.go(-1)
      }
    },
    handleEdit() {
      if (this.isEditing) {
        this.handleCancel()
      } else {
        this.isEditing = true
        this.$notify('Modo de edición activado', 'info')
      }
    },
    async handleSave() {
      try {
        this.isLoading = true
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Here you would make the actual API call
        // await this.saveCaseData()
        
        this.isEditing = false
        this.$notify('Caso guardado exitosamente', 'success')
      } catch (error) {
        this.$notify('Error al guardar el caso', 'error')
        console.error('Save error:', error)
      } finally {
        this.isLoading = false
      }
    },
    hasUnsavedChanges() {
      // Check if there are unsaved changes
      return this.isEditing
    },
    reloadData() {
      // Reload original data
      console.log('Reloading data...')
    },
    announceTabChange(tabId) {
      const tab = this.tabs.find(t => t.id === tabId)
      if (tab) {
        const message = `Pestaña ${tab.label} activada`
        // Announce to screen readers
        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'polite')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.className = 'sr-only'
        announcement.textContent = message
        
        document.body.appendChild(announcement)
        setTimeout(() => document.body.removeChild(announcement), 1000)
      }
    },
    initializeKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Alt + 1-6 for tab navigation
        if (e.altKey && e.key >= '1' && e.key <= '6') {
          e.preventDefault()
          const tabIndex = parseInt(e.key) - 1
          if (this.tabs[tabIndex]) {
            this.setActiveTab(this.tabs[tabIndex].id)
          }
        }
      })
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
}

.content-header h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
}

.tab-container {
  margin-top: 2rem;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #475569;
  background: var(--sii-blue-light);
}

.tab-button.active {
  color: var(--sii-blue);
  border-bottom-color: var(--sii-blue);
}

.tab-content-container {
  min-height: 400px;
}

@media (max-width: 1024px) {
  .content {
    margin: 0.5rem;
  }
}

@media (max-width: 768px) {
  .content {
    order: 1;
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .tab-nav {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}
</style>
