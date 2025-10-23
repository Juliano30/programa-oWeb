// Classes globais
class Toast {
    constructor(message, type = 'info', duration = 3000) {
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.createToast();
    }

    createToast() {
        const container = document.querySelector('.toast-container') || this.createContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${this.type}`;
        
        toast.innerHTML = Template.render('template-toast', {
            type: this.type.charAt(0).toUpperCase() + this.type.slice(1),
            message: this.message
        });

        container.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        setTimeout(() => {
            toast.remove();
        }, this.duration);
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}

class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        this.setupModal();
    }

    setupModal() {
        if (!this.modal) return;

        const closeButtons = this.modal.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Exportação de classes para uso global
window.Toast = Toast;
window.Modal = Modal;

// Inicialização do SPA
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Configuração das rotas SPA
    const routes = {
        '/': async () => {
            document.title = 'ONG Amigão - Proteção Animal';
            return Template.render('template-home');
        },
        '/projetos': async () => {
            document.title = 'Projetos - ONG Amigão';
            return Template.render('template-projects');
        },
        '/cadastro': async () => {
            document.title = 'Cadastro - ONG Amigão';
            return Template.render('template-register');
        },
        '/404': async () => {
            document.title = 'Página não encontrada - ONG Amigão';
            return Template.render('template-404');
        }
    };

    // Inicialização do Router
    const router = new Router(routes);

    // Menu Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Inicialização de Componentes
    document.querySelectorAll('[data-component]').forEach(element => {
        new Component(element);
    });

    // Inicialização de Formulários
    document.querySelectorAll('form').forEach(form => {
        new FormValidator(form);
    });
});