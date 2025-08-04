// Case Management System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFileUploads();
    initializeFormValidation();
    initializeTooltips();
    initializeKeyboardNavigation();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Announce tab change for screen readers
            announceToScreenReader(`Pestaña ${this.textContent} activada`);
        });
    });

    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = index === 0 ? tabButtons.length - 1 : index - 1;
                    tabButtons[targetIndex].focus();
                    tabButtons[targetIndex].click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = index === tabButtons.length - 1 ? 0 : index + 1;
                    tabButtons[targetIndex].focus();
                    tabButtons[targetIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabButtons[0].focus();
                    tabButtons[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    tabButtons[tabButtons.length - 1].focus();
                    tabButtons[tabButtons.length - 1].click();
                    break;
            }
        });
    });
}

// File upload functionality
function initializeFileUploads() {
    const fileInputs = document.querySelectorAll('.file-input');
    
    fileInputs.forEach(input => {
        const uploadArea = input.parentElement;
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-active');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-active');
            });
        });

        uploadArea.addEventListener('drop', handleDrop);
        
        // File input change handler
        input.addEventListener('change', function() {
            handleFileSelect(this);
        });

        // Click to upload
        uploadArea.addEventListener('click', () => {
            input.click();
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const files = e.dataTransfer.files;
        const input = e.target.querySelector('.file-input');
        if (files.length > 0) {
            input.files = files;
            handleFileSelect(input);
        }
    }

    function handleFileSelect(input) {
        const file = input.files[0];
        if (file) {
            const uploadArea = input.parentElement;
            const icon = uploadArea.querySelector('.document-icon');
            
            // Update upload area to show file selected
            uploadArea.classList.add('file-selected');
            icon.textContent = '✓';
            
            // Create file info element
            let fileInfo = uploadArea.querySelector('.file-info');
            if (!fileInfo) {
                fileInfo = document.createElement('div');
                fileInfo.className = 'file-info';
                uploadArea.appendChild(fileInfo);
            }
            
            fileInfo.innerHTML = `
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            `;
            
            // Validate file
            if (validateFile(file)) {
                uploadArea.classList.remove('error');
                uploadArea.classList.add('success');
            } else {
                uploadArea.classList.add('error');
                uploadArea.classList.remove('success');
            }
        }
    }

    function validateFile(file) {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!allowedTypes.includes(file.type)) {
            showNotification('Tipo de archivo no permitido', 'error');
            return false;
        }
        
        if (file.size > maxSize) {
            showNotification('El archivo es demasiado grande (máximo 10MB)', 'error');
            return false;
        }
        
        return true;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('.case-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('id') || field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Ingrese un email válido';
        }

        // Date validation
        if (field.type === 'date' && value && !isValidDate(value)) {
            isValid = false;
            errorMessage = 'Ingrese una fecha válida';
        }

        // Number validation
        if (field.type === 'number' && value && isNaN(value)) {
            isValid = false;
            errorMessage = 'Ingrese un número válido';
        }

        // Display validation result
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentElement.appendChild(errorElement);
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }
}

// Tooltips
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.id = 'active-tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
        tooltip.style.top = rect.top - tooltipRect.height - 8 + 'px';
        
        setTimeout(() => tooltip.classList.add('visible'), 10);
    }

    function hideTooltip() {
        const tooltip = document.getElementById('active-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    // Add tab index to interactive elements
    const interactiveElements = document.querySelectorAll('button, input, select, textarea, a[href]');
    
    interactiveElements.forEach((element, index) => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + 1-6 for tab navigation
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            const tabButtons = document.querySelectorAll('.tab-button');
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
                tabButtons[tabIndex].focus();
            }
        }

        // Escape to close modals or clear focus
        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.blur) {
                activeElement.blur();
            }
        }

        // Ctrl + S to save (prevent default and show message)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showNotification('Use el botón Guardar para guardar los cambios', 'info');
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);

    // Animate in
    setTimeout(() => notification.classList.add('visible'), 10);
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Form submission handling
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('case-form')) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Guardando...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Caso guardado exitosamente', 'success');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
});

// Button click handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Cancelar')) {
        if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
            window.location.reload();
        }
    }
    
    if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Editar')) {
        // Enable form editing
        const form = e.target.closest('.content').querySelector('.case-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        e.target.textContent = 'Cancelar Edición';
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-secondary');
        
        showNotification('Modo de edición activado', 'info');
    }
});

// Auto-save functionality (optional)
let autoSaveTimeout;
function setupAutoSave() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                // Auto-save logic here
                console.log('Auto-saving...');
            }, 30000); // Save after 30 seconds of inactivity
        });
    });
}

// Initialize auto-save if needed
// setupAutoSave();

// Export functions for external use
window.CaseManagement = {
    showNotification,
    announceToScreenReader,
    validateField: function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            return validateField(field);
        }
        return false;
    }
};
