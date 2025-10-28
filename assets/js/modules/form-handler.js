export class FormHandler {
    static setupFieldMasks() {
        // Adicionar máscaras aos campos
        document.querySelectorAll('input').forEach(input => {
            switch(input.id) {
                case 'cpf':
                    input.addEventListener('input', (e) => {
                        e.target.value = this.mascaraCPF(e.target.value);
                    });
                    break;
                case 'telefone':
                    input.addEventListener('input', (e) => {
                        e.target.value = this.mascaraTelefone(e.target.value);
                    });
                    break;
                case 'cep':
                    input.addEventListener('input', (e) => {
                        e.target.value = this.mascaraCEP(e.target.value);
                    });
                    input.addEventListener('blur', async () => {
                        const cep = input.value.replace(/\D/g, '');
                        if (cep.length === 8) {
                            await this.buscarCEP(cep);
                        }
                    });
                    break;
            }
        });
    }

    static mascaraCPF(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    static mascaraTelefone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }

    static mascaraCEP(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    }

    static async buscarCEP(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                
                // Foca no campo número após preenchimento
                document.getElementById('numero').focus();
            } else {
                new Toast('CEP não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            new Toast('Erro ao buscar CEP. Tente novamente mais tarde.', 'error');
        }
    }

    static validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }
}