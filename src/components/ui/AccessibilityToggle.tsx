/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';

const fontSizes = ['Padrão', 'Grande', 'Maior'] as const;

export const AccessibilityToggle = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontLevel, setFontLevel] = useState(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Carregar preferências do localStorage ao montar
  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    const font = parseInt(localStorage.getItem('fontSize') || '0');

    if (dark) {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }

    if (font > 0) {
      document.body.classList.add(font === 1 ? 'font-large' : 'font-larger');
      setFontLevel(font);
    }
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const increaseFontSize = () => {
    const nextLevel = (fontLevel + 1) % 3;
    setFontLevel(nextLevel);

    document.body.classList.remove('font-large', 'font-larger');

    if (nextLevel === 1) document.body.classList.add('font-large');
    if (nextLevel === 2) document.body.classList.add('font-larger');

    localStorage.setItem('fontSize', nextLevel.toString());
  };

  const reset = () => {
    setIsDarkMode(false);
    setFontLevel(0);

    document.body.classList.remove('dark-mode', 'font-large', 'font-larger');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('fontSize');
  };

  return (
    <div
      ref={buttonRef}
      className="accessibility-toggle-fixed"
      onClick={(e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
      }}
    >
      <i className="fas fa-universal-access"></i>

      {/* Menu flutuante */}
      <div
        ref={menuRef}
        className={`accessibility-menu ${showMenu ? 'show' : ''}`}
      >
        {/* Modo Escuro */}
        <button className="acc-item" onClick={toggleDarkMode}>
          <i className="fas fa-moon"></i> Modo Escuro
          <span className="acc-check">{isDarkMode ? 'On' : 'Off'}</span>
        </button>

        {/* Aumentar Fonte */}
        <button className="acc-item" onClick={increaseFontSize}>
          <i className="fas fa-text-height"></i> Aumentar Fonte
          <span className="acc-check">{fontSizes[fontLevel]}</span>
        </button>

        {/* Reset */}
        <button className="acc-item" onClick={reset}>
          <i className="fas fa-undo"></i> Restaurar Padrão
        </button>
      </div>
    </div>
  );
};