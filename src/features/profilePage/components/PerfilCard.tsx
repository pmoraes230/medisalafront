import { useRef, useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import SuccessModal from '@/components/ui/SuccessModal';

export default function PerfilCard() {
  const { foto, hasChanges, updateFoto, saveFoto } = useUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateFoto(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveFoto();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar" id="profile-avatar">
            {foto ? (
              <img src={foto} alt="Foto do usuário" id="profile-img" />
            ) : (
              <i className="fas fa-user"></i>
            )}
            <label htmlFor="upload-photo" className="upload-btn">
              <i className="fas fa-camera"></i>
            </label>
          </div>

          <input
            type="file"
            id="upload-photo"
            ref={fileInputRef}
            className="hidden-input"
            accept="image/*"
            onChange={handleFileChange}
          />

          <h2 className="profile-name">Name User</h2>
          <p className="profile-role">Cep Belém</p>

          <button
            className="btn-save"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            <i className="fas fa-check"></i>
            {hasChanges ? 'Salvar Alterações' : 'Salvo!'}
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        message="Foto salva com sucesso!"
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}