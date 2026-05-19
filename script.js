// --- [MÓDULO: REGLAS DE NEGOCIO Y ESTADO] ---

const resolveThemeName = (selectedTheme, isSystemDark) => {
    if (selectedTheme === 'system') {
        return isSystemDark ? 'dark' : 'light';
    }
    return selectedTheme;
};

const verifyDownloadPermission = (isLoggedIn) => {
    return {
        allowed: isLoggedIn,
        reason: isLoggedIn ? null : "¡Vaya! Necesitas una cuenta para descargar estas obras de arte."
    };
};


// --- [MÓDULO: ADAPTADORES DEL DOM / EFECTOS SECUNDARIOS] ---

// Abstrae la manipulación imperativa del entorno web para interactuar con elementos físicos
const domAdapter = {
    setHtmlAttribute: (attr, value) => {
        document.documentElement.setAttribute(attr, value);
    },
    isSystemDarkScheme: () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    triggerFileDownload: (url, filename = 'imagen_galeria.jpg') => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    },
    openAuthModal: (message) => {
        showLoginModal(message); // Mapeo directo a la función global preexistente
    }
};


// --- [MÓDULO: CONTROLADORES / ORQUESTADORES] ---

const themeToggle = document.querySelector('#theme-select');

const applyTheme = (theme) => {
    // Inyectamos la dependencia del entorno web de forma limpia
    const isDark = domAdapter.isSystemDarkScheme();
    const finalTheme = resolveThemeName(theme, isDark);
    
    domAdapter.setHtmlAttribute('data-theme', finalTheme);
};

function downloadImage(imageUrl) {
    const isLoggedIn = checkUserAuth(); 
    const permission = verifyDownloadPermission(isLoggedIn);

    if (!permission.allowed) {
        domAdapter.openAuthModal(permission.reason);
        return;
    }

    // Ejecutamos la descarga aislando la creación del elemento 'a'
    domAdapter.triggerFileDownload(imageUrl);
}

// Inicialización de escuchas de eventos
themeToggle.addEventListener('change', (e) => applyTheme(e.target.value));