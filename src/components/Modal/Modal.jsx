import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ closeModal, fullImage }) => {
  const handleEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  });

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.module}>
        <img src={fullImage} alt="" />
      </div>
    </div>
  );
};
export default Modal;
