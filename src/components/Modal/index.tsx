import React, { ReactElement } from 'react';

import './Modal.less';

export type ModalProps = {
  onCancel?: () => void;
  children?: ReactElement;
  visible?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  onCancel,
  visible = false,
  children,
}) => {
  const showHideClassName = visible
    ? 'modal display-block'
    : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="modal-close" type="button" onClick={onCancel}>
          x
        </button>
      </section>
    </div>
  );
};

export default Modal;
