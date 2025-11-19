import { ReactNode } from "react";

interface ModalOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function modelOverlay({ isOpen, onClose, children }: ModalOverlayProps) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay show"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {children}
        </div>
    )
}