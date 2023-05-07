import {useState} from "react";

import style from "./Modal.module.css";

const Modal = ({
  open,
  setOpen,
  title,
  children,
  handleOk,
  okButtonText,
  handleCancel,
}) => {
  if (open === false) return <></>;

  return (
    <div className={style.modalCover}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.modalTitle}>{title}</h2>
          <button className={style.closeModal} onClick={() => setOpen(false)}>
            X
          </button>
        </div>
        <div className={style.modalBody}>{children}</div>
        <div className={style.modalFooter}>
          <button
            className={style.footerOk}
            onClick={() => {
              handleOk && handleOk();
              setOpen(false);
            }}
          >
            {okButtonText}
          </button>
          <button
            className={style.footerCancel}
            onClick={() => {
              handleCancel && handleCancel();
              setOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
