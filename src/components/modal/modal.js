import React from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { Typography } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.querySelector("#root");

export const Modal = (props) => {

  const closeModal = props.onClose

  React.useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <ModalOverlay close={closeModal}>
      <div
        className={modal.container}
        onClick={(e) => e.stopPropagation()}
      >
        {props.title ? <h1 className={modal.title}>{props.title}</h1> : <></>}
        {!props.black ? (
          <button className={modal.button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        ) : (
          <></>
        )}
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  title: PropTypes.string.isRequired,
  modal: PropTypes.bool
};
