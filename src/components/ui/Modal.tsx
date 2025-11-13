interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning';
}

export const Modal = ({ show, onClose, title, children, type = 'success' }: ModalProps) => {
  if (!show) return null;

  const icon = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-x-circle-fill text-danger',
    warning: 'bi-exclamation-triangle-fill text-warning',
  }[type];

  return (
    <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.7)' }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className={`bi ${icon} me-2`}></i> {title}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-dark">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};