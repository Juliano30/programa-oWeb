// Gerenciamento de temas
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    
    // Atualizar ARIA
    document.querySelectorAll('.theme-button').forEach(button => {
        const isSelected = button.getAttribute('onclick').includes(themeName);
        button.setAttribute('aria-pressed', isSelected);
    });
}

// Carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Atalhos de teclado para acessibilidade
document.addEventListener('keydown', (e) => {
    // Alt + T para alternar entre temas
    if (e.altKey && e.key === 't') {
        const themes = ['light', 'dark', 'high-contrast'];
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextThemeIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
        setTheme(themes[nextThemeIndex]);
    }
});

// Inicializar tema
document.addEventListener('DOMContentLoaded', loadSavedTheme);