import React, { FC, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ onClose, children, className, ...props }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const modalContent = (
    <div
      ref={overlayRef}
      className={`fixed left-0 top-0 flex size-full items-center justify-center bg-black/50`}
      onClick={handleOverlayClick}
    >
      <div className="max-w-[430px] px-4">
        <div
          className={`flex  h-auto w-full rounded-[20px] bg-white p-[20px] text-black ${className}`}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot);
  }

  return null;
};

export default Modal;
