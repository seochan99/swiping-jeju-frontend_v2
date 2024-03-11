import React, { FC } from 'react';

import Button from '../common/Button';
import Modal from '../common/Modal';

interface Props {
  onClose: () => void;
  onClick: () => void;
  text: string;
  cancelText?: string;
  submitText?: string;
  hiddenCancel?: boolean;
}

const Modal_Swipe: FC<Props> = ({
  onClose,
  onClick,
  text,
  cancelText,
  submitText,
  hiddenCancel = false,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">{text}</p>
        <div className="w-full">
          <div className="flex w-full gap-4">
            {!hiddenCancel && (
              <Button
                onClick={onClose}
                type={'button'}
                className="w-full"
                color="outline"
              >
                {cancelText || '취소'}
              </Button>
            )}
            <Button onClick={onClick} type={'button'} className="w-full">
              {submitText || '만들기'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Modal_Swipe;
