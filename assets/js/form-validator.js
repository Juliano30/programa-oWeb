class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
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
            
            // Adiciona mensagens de erro customizadas
            this.setupCustomValidation(input);
        });
    }

    setupCustomValidation(input) {
        const validations = {
            required: 'Este campo é obrigatório',
            email: 'Por favor, insira um e-mail válido',
            minLength: `Mínimo de ${input.minLength} caracteres necessários`,
            maxLength: `Máximo de ${input.maxLength} caracteres permitidos`,
            pattern: 'Formato inválido'
        };

        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            
            // Encontra o primeiro erro de validação
            let errorMessage = '';
            for (const key in validations) {
                if (input.validity[key]) {
                    errorMessage = validations[key];
                    break;
                }
            }

            this.showError(input, errorMessage);
        });
    }

    validateInput(input) {
        if (input.validity.valid) {
            this.clearError(input);
            return true;
        } else {
            input.reportValidity(); // Dispara o evento 'invalid'
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
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);

        // Armazena referência ao erro
        this.errors[input.name] = errorDiv;
    }

    clearError(input) {
        input.classList.remove('error');
        
        // Remove mensagem de erro se existir
        if (this.errors[input.name]) {
            this.errors[input.name].remove();
            delete this.errors[input.name];
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = this.form.querySelectorAll('input, select, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Envia o formulário
                this.submitForm();
            } else {
                new Toast('Por favor, corrija os erros no formulário.', 'error');
            }
        });
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Simula envio para API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Salva no localStorage
            this.saveToLocalStorage(data);
            
            new Toast('Formulário enviado com sucesso!', 'success');
            this.form.reset();
        } catch (error) {
            new Toast('Erro ao enviar formulário. Tente novamente.', 'error');
        }
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