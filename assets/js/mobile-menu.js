// Menu Hamburguer
function toggleMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Dropdown no mobile
function toggleDropdown(event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        const dropdown = event.currentTarget.parentElement;
        dropdown.classList.toggle('active');
    }
}

// Fechar menu ao clicar em um link
function closeMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar listener para o botão do menu
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Adicionar listeners para os dropdowns
    const dropdownLinks = document.querySelectorAll('.nav-dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', toggleDropdown);
    });

    // Fechar menu ao clicar em links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});