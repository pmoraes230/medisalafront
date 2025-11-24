import ModalOverlay from '@/components/ui/ModalOverlay';

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
}

export default function SuccessModal({ isOpen, message }: SuccessModalProps) {
  return (
    <ModalOverlay isOpen={isOpen} onClose={() => {}}>
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