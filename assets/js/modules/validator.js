export class Validator {
    static validators = {
        required: (value) => ({
            isValid: value !== '',
            message: 'Este campo é obrigatório'
        }),

        email: (value) => ({
            isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Por favor, insira um e-mail válido'
        }),

        minLength: (value, length) => ({
            isValid: value.length >= length,
            message: `Mínimo de ${length} caracteres necessários`
        }),

        maxLength: (value, length) => ({
            isValid: value.length <= length,
            message: `Máximo de ${length} caracteres permitidos`
        }),

        pattern: (value, pattern) => ({
            isValid: new RegExp(pattern).test(value),
            message: 'Formato inválido'
        }),

        phone: (value) => ({
            isValid: /^\(\d{2}\) \d{4,5}-\d{4}$/.test(value),
            message: 'Telefone inválido. Use o formato (99) 99999-9999'
        }),

        cpf: (value) => {
            const cleanCPF = value.replace(/\D/g, '');
            if (cleanCPF.length !== 11) return { isValid: false, message: 'CPF inválido' };
            
            // Validação completa de CPF
            let sum = 0;
            let remainder;
            
            if (cleanCPF === '00000000000') return { isValid: false, message: 'CPF inválido' };

            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
            }

            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
                return { isValid: false, message: 'CPF inválido' };
            }

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
            }

            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
                return { isValid: false, message: 'CPF inválido' };
            }

            return { isValid: true, message: '' };
        },

        date: (value) => {
            const date = new Date(value);
            return {
                isValid: !isNaN(date.getTime()),
                message: 'Data inválida'
            };
        },

        age: (value, minAge = 18) => {
            const date = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const monthDiff = today.getMonth() - date.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
                age--;
            }

            return {
                isValid: age >= minAge,
                message: `Idade mínima necessária: ${minAge} anos`
            };
        }
    }

    static async validate(value, rules) {
        for (const [ruleName, ruleValue] of Object.entries(rules)) {
            const validator = this.validators[ruleName];
            if (!validator) continue;

            const result = validator(value, ruleValue);
            if (!result.isValid) {
                return result;
            }
        }

        return { isValid: true, message: '' };
    }
}