export class UIUtils {
    static setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    static getTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    static announceToScreenReader(message) {
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    }

    static scrollIntoView(elementId, options = { behavior: 'smooth' }) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView(options);
        }
    }
}