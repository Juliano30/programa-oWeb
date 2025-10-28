import { FormHandler } from './form-handler.js';
import { UIUtils } from './utils.js';

export class Router {
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        // Configuração das rotas
        window.showPage = this.showPage.bind(this);

        // Inicializar página inicial
        document.addEventListener('DOMContentLoaded', () => {
            this.showPage('home');
        });
    }

    showPage(page, section = null) {
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

        // Carregar o template correto
        switch(page) {
            case 'home':
                template = document.getElementById('template-home');
                document.title = 'ONG Amigão - Proteção Animal';
                break;
            case 'projects':
                template = document.getElementById('template-projects');
                document.title = 'Projetos - ONG Amigão';
                break;
            case 'register':
                template = document.getElementById('template-register');
                document.title = 'Cadastro - ONG Amigão';
                break;
            default:
                template = document.getElementById('template-404');
                document.title = 'Página não encontrada - ONG Amigão';
        }

        if (template) {
            app.innerHTML = template.innerHTML;
            
            // Rolar para seção específica em projetos
            if (section && page === 'projects') {
                UIUtils.scrollIntoView(section);
            }

            // Inicializar formulários se estivermos na página de cadastro
            if (page === 'register') {
                FormHandler.initializeForms();
            }

            // Anunciar mudança de página
            UIUtils.announceToScreenReader(`Página carregada: ${document.title}`);
        } else {
            app.innerHTML = document.getElementById('template-404').innerHTML;
        }
    }
}