const themeToggle = document.querySelector('#theme-select');

const applyTheme = (theme) => {
    if (theme === 'system') {
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        document.documentElement.setAttribute('data-theme', darkQuery.matches ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
};

themeToggle.addEventListener('change', (e) => applyTheme(e.target.value));


function downloadImage(imageUrl) {
    const isLoggedIn = checkUserAuth(); // Función que verifica si hay sesión activa

    if (!isLoggedIn) {
        showLoginModal("¡Vaya! Necesitas una cuenta para descargar estas obras de arte.");
        return;
    }

    // Lógica para descargar la imagen
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen_galeria.jpg';
    link.click();
}