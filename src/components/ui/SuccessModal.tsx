import ModalOverlay from '@/components/ui/ModalOverlay';

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onClose?: () => void
}

export default function SuccessModal({ isOpen, message, onClose }: SuccessModalProps) {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="modal_default">
        <div className="modal_header">
          <div className="modal-icon success">
            <i className="fas fa-check"></i>
          </div>
          <div className="modal_title">Sucesso!</div>
        </div>
        <div style={{ margin: '1rem' }} className="modal_body">{message}</div>
      </div>
    </ModalOverlay>
  );
}