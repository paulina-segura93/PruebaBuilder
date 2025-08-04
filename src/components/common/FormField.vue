<template>
  <div class="form-group" :class="{ 'full-width': fullWidth }">
    <label :for="fieldId" class="form-label">{{ label }}</label>
    
    <!-- Text input -->
    <input
      v-if="type === 'text' || type === 'email' || type === 'number' || type === 'date'"
      :id="fieldId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="form-input"
      :class="{ error: hasError }"
      @input="handleInput"
      @blur="handleBlur"
    />
    
    <!-- Select -->
    <select
      v-else-if="type === 'select'"
      :id="fieldId"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      class="form-select"
      :class="{ error: hasError }"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <!-- Textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="fieldId"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      class="form-textarea"
      :class="{ error: hasError }"
      @input="handleInput"
      @blur="handleBlur"
    />
    
    <!-- Checkbox -->
    <label 
      v-else-if="type === 'checkbox'" 
      class="checkbox-label"
    >
      <input
        :id="fieldId"
        type="checkbox"
        :checked="modelValue"
        :required="required"
        :disabled="disabled"
        class="form-checkbox"
        @change="handleCheckboxChange"
      />
      <span class="checkbox-text">{{ checkboxText }}</span>
    </label>
    
    <!-- Radio group -->
    <div v-else-if="type === 'radio'" class="radio-group">
      <label 
        v-for="option in options" 
        :key="option.value"
        class="radio-label"
      >
        <input
          :name="fieldId"
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          :required="required"
          :disabled="disabled"
          class="form-radio"
          @change="handleRadioChange"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
    
    <!-- Error message -->
    <span v-if="errorMessage" class="field-error">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => [
        'text', 'email', 'number', 'date', 'select', 
        'textarea', 'checkbox', 'radio'
      ].includes(value)
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Number,
      default: 4
    },
    checkboxText: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    validate: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hasError: false,
      errorMessage: ''
    }
  },
  computed: {
    fieldId() {
      return `field-${this.label.toLowerCase().replace(/\s+/g, '-')}`
    }
  },
  methods: {
    handleInput(event) {
      const value = this.type === 'number' ? Number(event.target.value) : event.target.value
      this.$emit('update:modelValue', value)
      this.clearError()
    },
    handleChange(event) {
      this.$emit('update:modelValue', event.target.value)
      this.clearError()
    },
    handleCheckboxChange(event) {
      this.$emit('update:modelValue', event.target.checked)
      this.clearError()
    },
    handleRadioChange(event) {
      this.$emit('update:modelValue', event.target.value)
      this.clearError()
    },
    handleBlur() {
      if (this.validate) {
        this.validateField()
      }
    },
    validateField() {
      this.hasError = false
      this.errorMessage = ''
      
      // Required validation
      if (this.required && !this.modelValue) {
        this.hasError = true
        this.errorMessage = 'Este campo es obligatorio'
        return false
      }
      
      // Email validation
      if (this.type === 'email' && this.modelValue && !this.isValidEmail(this.modelValue)) {
        this.hasError = true
        this.errorMessage = 'Ingrese un email válido'
        return false
      }
      
      // Number validation
      if (this.type === 'number' && this.modelValue && isNaN(this.modelValue)) {
        this.hasError = true
        this.errorMessage = 'Ingrese un número válido'
        return false
      }
      
      // Date validation
      if (this.type === 'date' && this.modelValue && !this.isValidDate(this.modelValue)) {
        this.hasError = true
        this.errorMessage = 'Ingrese una fecha válida'
        return false
      }
      
      return true
    },
    clearError() {
      this.hasError = false
      this.errorMessage = ''
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    isValidDate(dateString) {
      const date = new Date(dateString)
      return date instanceof Date && !isNaN(date)
    }
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--sii-blue);
  box-shadow: 0 0 0 3px var(--sii-blue-light);
  transform: translateY(-1px);
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  appearance: none;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-input:valid {
  border-color: #10b981;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.form-checkbox {
  margin: 0;
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  font-weight: normal;
  font-size: 0.875rem;
}

.form-radio {
  margin: 0;
}

.field-error {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Focus styles for accessibility */
.form-input:focus-visible,
.form-select:focus-visible,
.form-textarea:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
