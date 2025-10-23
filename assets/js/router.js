export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentPath = '';
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });

        // Chama handleRoute imediatamente após a inicialização
        window.addEventListener('load', () => this.handleRoute());
    }

    async handleRoute() {
        const path = window.location.pathname;
        
        // Remove trailing slash except for root path
        const normalizedPath = path === '/' ? path : path.replace(/\/$/, '');
        
        if (normalizedPath === this.currentPath) return;

        this.currentPath = normalizedPath;
        const route = this.routes[normalizedPath] || this.routes['/404'];
        
        try {
            const content = await route();
            document.querySelector('#app').innerHTML = content;
            
            // Scroll to hash if present
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) element.scrollIntoView();
            }
        } catch (error) {
            console.error('Error loading route:', error);
            document.querySelector('#app').innerHTML = await this.routes['/404']();
        }
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }
}