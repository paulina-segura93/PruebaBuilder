<template>
  <div class="document-section">
    <div 
      v-for="document in documents" 
      :key="document.id"
      class="document-item"
    >
      <label>{{ document.label }}</label>
      <div 
        class="document-upload"
        :class="{
          'drag-active': dragActive === document.id,
          'file-selected': document.file,
          'success': document.file && !hasError(document.id),
          'error': hasError(document.id)
        }"
        @click="() => triggerFileInput(document.id)"
        @dragenter.prevent="() => setDragActive(document.id)"
        @dragover.prevent
        @dragleave.prevent="() => setDragActive(null)"
        @drop.prevent="(e) => handleDrop(e, document.id)"
      >
        <span class="document-icon">
          {{ document.file ? '✓' : '📄' }}
        </span>
        
        <div v-if="document.file" class="file-info">
          <span class="file-name">{{ document.file.name }}</span>
          <span class="file-size">{{ formatFileSize(document.file.size) }}</span>
        </div>
        
        <input 
          :id="`file-${document.id}`"
          type="file" 
          class="file-input"
          :accept="acceptedTypes"
          @change="(e) => handleFileSelect(e, document.id)"
        />
      </div>
      
      <button 
        v-if="document.file"
        type="button"
        class="remove-file-btn"
        @click.stop="() => removeFile(document.id)"
        title="Eliminar archivo"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentUpload',
  props: {
    documents: {
      type: Array,
      required: true
    },
    acceptedTypes: {
      type: String,
      default: '.pdf,.doc,.docx,.jpg,.jpeg,.png'
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024 // 10MB
    }
  },
  emits: ['upload', 'remove'],
  data() {
    return {
      dragActive: null,
      errors: {}
    }
  },
  methods: {
    triggerFileInput(documentId) {
      document.getElementById(`file-${documentId}`).click()
    },
    setDragActive(documentId) {
      this.dragActive = documentId
    },
    handleDrop(event, documentId) {
      this.dragActive = null
      const files = event.dataTransfer.files
      if (files.length > 0) {
        this.processFile(files[0], documentId)
      }
    },
    handleFileSelect(event, documentId) {
      const file = event.target.files[0]
      if (file) {
        this.processFile(file, documentId)
      }
    },
    processFile(file, documentId) {
      // Clear previous errors
      delete this.errors[documentId]
      
      // Validate file
      if (!this.validateFile(file, documentId)) {
        return
      }
      
      // Emit upload event
      this.$emit('upload', documentId, file)
    },
    validateFile(file, documentId) {
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      
      if (!allowedTypes.includes(file.type)) {
        this.setError(documentId, 'Tipo de archivo no permitido')
        this.$notify('Tipo de archivo no permitido', 'error')
        return false
      }
      
      if (file.size > this.maxSize) {
        this.setError(documentId, 'El archivo es demasiado grande')
        this.$notify(`El archivo es demasiado grande (máximo ${this.formatFileSize(this.maxSize)})`, 'error')
        return false
      }
      
      return true
    },
    removeFile(documentId) {
      this.$emit('remove', documentId)
      this.$delete(this.errors, documentId)
    },
    setError(documentId, message) {
      this.errors[documentId] = message
    },
    hasError(documentId) {
      return !!this.errors[documentId]
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.document-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.document-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.document-item label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.document-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  min-height: 120px;
}

.document-upload:hover {
  border-color: #667eea;
  background: #f0f4ff;
}

.document-upload.drag-active {
  border-color: #667eea;
  background-color: #f0f4ff;
  transform: scale(1.02);
}

.document-upload.file-selected {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.document-upload.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.document-upload.success {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.document-icon {
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.file-selected .document-icon {
  color: #10b981;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-info {
  text-align: center;
  margin-top: 0.5rem;
}

.file-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.file-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.remove-file-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-file-btn:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .document-section {
    grid-template-columns: 1fr;
  }
  
  .document-upload {
    padding: 1.5rem 1rem;
    min-height: 100px;
  }
  
  .document-icon {
    font-size: 1.5rem;
  }
}
</style>
