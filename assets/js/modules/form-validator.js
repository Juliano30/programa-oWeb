import { Validator } from './validator.js';
import { Toast } from './toast.js';

export class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = new Map();
        this.setupValidation();
    }

    setupValidation() {
        this.form.noValidate = true;
        this.setupInputValidation();
        this.setupFormSubmission();
    }

    setupInputValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validação em tempo real
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input));
            
            // Adiciona regras de validação
            this.setupValidationRules(input);
        });
    }

    setupValidationRules(input) {
        const rules = {};

        if (input.required) rules.required = true;
        if (input.type === 'email') rules.email = true;
        if (input.minLength) rules.minLength = input.minLength;
        if (input.maxLength) rules.maxLength = input.maxLength;
        if (input.pattern) rules.pattern = input.pattern;

        // Regras específicas por tipo ou data-attribute
        if (input.dataset.type === 'phone') rules.phone = true;
        if (input.dataset.type === 'cpf') rules.cpf = true;
        if (input.type === 'date' && input.dataset.minAge) {
            rules.date = true;
            rules.age = parseInt(input.dataset.minAge);
        }

        input.validationRules = rules;
    }

    async validateInput(input) {
        const rules = input.validationRules;
        if (!rules) return true;

        const result = await Validator.validate(input.value, rules);

        if (result.isValid) {
            this.clearError(input);
            return true;
        } else {
            this.showError(input, result.message);
            return false;
        }
    }

    showError(input, message) {
        input.classList.add('error');
        
        // Remove mensagem de erro antiga se existir
        this.clearError(input);

        // Cria e insere nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('aria-live', 'polite');
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);

        // Armazena referência ao erro
        this.errors.set(input.name, errorDiv);
    }

    clearError(input) {
        input.classList.remove('error');
        
        const errorDiv = this.errors.get(input.name);
        if (errorDiv) {
            errorDiv.remove();
            this.errors.delete(input.name);
        }
    }

    async setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const inputs = this.form.querySelectorAll('input, select, textarea');
            let isValid = true;

            // Valida todos os campos em paralelo
            const validations = Array.from(inputs).map(input => this.validateInput(input));
            const results = await Promise.all(validations);

            if (results.every(result => result)) {
                await this.submitForm();
            } else {
                new Toast('Por favor, corrija os erros no formulário.', 'error');
                // Foca no primeiro campo com erro
                const firstInvalidInput = Array.from(inputs).find(input => 
                    input.classList.contains('error')
                );
                if (firstInvalidInput) firstInvalidInput.focus();
            }
        });
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Aqui você pode adicionar a lógica de envio para API
            await this.simulateApiCall(data);
            
            // Salva no localStorage
            this.saveToLocalStorage(data);
            
            new Toast('Formulário enviado com sucesso!', 'success');
            this.form.reset();
        } catch (error) {
            new Toast('Erro ao enviar formulário. Tente novamente.', 'error');
            console.error('Erro ao enviar formulário:', error);
        }
    }

    async simulateApiCall(data) {
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Aqui você pode adicionar validações do lado do servidor
        return true;
    }

    saveToLocalStorage(data) {
        const key = this.form.id || 'form-data';
        let savedData = JSON.parse(localStorage.getItem(key) || '[]');
        savedData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(key, JSON.stringify(savedData));
    }
}