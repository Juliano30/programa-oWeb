export class Toast {
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
        
        toast.innerHTML = this.getTemplate();
        container.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.destroyToast(toast);
        });

        setTimeout(() => {
            this.destroyToast(toast);
        }, this.duration);
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    destroyToast(toast) {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 300);
    }

    getTemplate() {
        return `
            <div class="toast-content">
                <span class="toast-type">${this.type.charAt(0).toUpperCase() + this.type.slice(1)}</span>
                <p class="toast-message">${this.message}</p>
            </div>
            <button class="toast-close" aria-label="Fechar notificação">×</button>
        `;
    }
}