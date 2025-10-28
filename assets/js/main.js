import { Toast } from './modules/toast.js';
import { Modal } from './modules/modal.js';
import { FormValidator } from './modules/form-validator.js';
import { EventBus } from './modules/event-bus.js';
import { Template } from './modules/template.js';

// Event bus global
window.eventBus = new EventBus();

// Exportação de classes para uso global
window.Toast = Toast;
window.Modal = Modal;

// Classe principal da aplicação
class App {
    constructor() {
        this.setupRoutes();
        this.initializeEventListeners();
        this.setupTheme();
    }

    setupRoutes() {
        // Configuração das rotas SPA
        this.routes = {
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
    }

    initializeEventListeners() {
        // Menu Mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const isExpanded = navMenu.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded);
                window.eventBus.emit('menuToggled', isExpanded);
            });

            // Fechar menu ao clicar em um link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    window.eventBus.emit('menuClosed');
                });
            });
        }

        // Inicialização de Componentes
        document.querySelectorAll('[data-component]').forEach(element => {
            this.initializeComponent(element);
        });

        // Inicialização de Formulários
        document.querySelectorAll('form').forEach(form => {
            new FormValidator(form);
        });
    }

    initializeComponent(element) {
        const componentName = element.dataset.component;
        switch(componentName) {
            case 'modal':
                new Modal(element.id);
                break;
            // Adicione outros componentes conforme necessário
        }
    }

    setupTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                window.eventBus.emit('themeChanged', newTheme);
            });
        }
    }

    static showPage(page, section = null) {
        const app = document.getElementById('app');
        let template;

        // Limpar classes ativas do menu
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Encontrar e ativar o link correto
        const activeLink = document.querySelector(`[onclick*="showPage('${page}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Emitir evento de mudança de página
        window.eventBus.emit('pageChanged', { page, section });

        // Carregar o template correto
        switch(page) {
            case 'home':
                template = document.getElementById('template-home');
                break;
            case 'projects':
                template = document.getElementById('template-projects');
                break;
            case 'register':
                template = document.getElementById('template-register');
                break;
            default:
                template = document.getElementById('template-404');
        }

        if (template) {
            app.innerHTML = template.innerHTML;
            if (section && page === 'projects') {
                const sectionElement = document.getElementById(section);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Inicializar formulários se estivermos na página de cadastro
            if (page === 'register') {
                this.initializeForms();
            }

            // Anunciar mudança de página para leitores de tela
            const announcer = document.getElementById('screen-reader-announcer');
            if (announcer) {
                announcer.textContent = `Página carregada: ${document.title}`;
            }
        }
    }
}

// Exportar App para uso global
window.App = App;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    App.showPage('home');
});
});