export class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        this.isOpen = false;
        this.setupModal();
    }

    setupModal() {
        if (!this.modal) return;

        this.setupCloseButtons();
        this.setupOutsideClick();
        this.setupKeyboardEvents();
    }

    setupCloseButtons() {
        const closeButtons = this.modal.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });
    }

    setupOutsideClick() {
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        this.modal.setAttribute('aria-hidden', 'false');
        this.trapFocus();
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        this.modal.setAttribute('aria-hidden', 'true');
    }

    trapFocus() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        firstFocusableElement.focus();
    }
}