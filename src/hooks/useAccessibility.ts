import { useState, useEffect } from "react";

const FONT_SIZES = ['Padrão', 'Grande', 'Maior'] as const;

export const useAccessibility = () => {
    
    // As inicializações continuam corretas (Lazy Initial State)
    const [ darkMode, setDarkMode ] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [ fontLevel, setFontLevel ] = useState(() => {
        return parseInt(localStorage.getItem('fontSize') || '0');
    });
    const [ showMenu, setShowMenu ] = useState(false);

    useEffect(() => {
        localStorage.setItem('darkMode', String(darkMode));
        localStorage.setItem('fontSize', String(fontLevel));

        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        document.body.classList.remove('font-large', 'font-larger');
        if (fontLevel === 1) {
            document.body.classList.add('font-large');
        } else if (fontLevel === 2) {
            document.body.classList.add('font-larger');
        }
        
    }, [darkMode, fontLevel]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const increaseFontSize = () => {
        setFontLevel(prev => (prev + 1) % 3);
    };

    const reset = () => {
        document.body.classList.remove('dark-mode', 'font-large', 'font-larger');
        localStorage.removeItem('darkMode');
        localStorage.removeItem('fontSize');

        setDarkMode(false);
        setFontLevel(0);
    };

    return { 
        darkMode, 
        toggleDarkMode, 
        fontLevel, 
        increaseFontSize, 
        fontSizes: FONT_SIZES, 
        showMenu, 
        setShowMenu, 
        reset 
    };
}