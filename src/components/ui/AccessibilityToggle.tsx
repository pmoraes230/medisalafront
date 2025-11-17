// src/features/dashboard/components/AccessibilityToggle.tsx
import { useAccessibility } from '../../hooks/useAccessibility';

export const AccessibilityToggle = () => {
  const { showMenu, setShowMenu, toggleDarkMode, increaseFontSize, reset, fontLabel } = useAccessibility();

  // Estado do dark mode (mais confiável que ler localStorage direto)
  const isDarkMode = document.body.classList.contains('dark-mode');

  return (
    <div
      className="accessibility-toggle-fixed"
      id="accessibility-toggle"
      onClick={() => setShowMenu(!showMenu)}
    >
      {/* Ícone principal */}
      <i className="fas fa-universal-access"></i>

      {/* Menu flutuante */}
      {showMenu && (
        <div className="accessibility-menu" id="accessibility-menu">
          {/* Modo Escuro */}
          <button className="acc-item" onClick={toggleDarkMode}>
            <i className="fas fa-moon"></i> Modo Escuro
            <span className="acc-check" id="dark-check">
              {isDarkMode ? 'On' : 'Off'}
            </span>
          </button>

          {/* Aumentar Fonte */}
          <button className="acc-item" onClick={increaseFontSize}>
            <i className="fas fa-text-height"></i> Aumentar Fonte
            <span className="acc-check" id="font-level">
              {fontLabel}
            </span>
          </button>

          {/* Restaurar Padrão */}
          <button className="acc-item" onClick={reset}>
            <i className="fas fa-undo"></i> Restaurar Padrão
          </button>
        </div>
      )}
    </div>
  );
};