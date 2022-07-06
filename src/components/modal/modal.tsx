import React, { FC,  ReactNode } from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector("#root");

type TModal = {
  onClose?: () => void;
  children: ReactNode;
  title: string
  modal?: boolean
  black?: boolean
};

export const Modal: FC<TModal> = (props) => {

  const closeModal = props.onClose ? props.onClose : () => null

  React.useEffect(() => {
    const closeByEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [closeModal]);

  return modalRoot ? ReactDOM.createPortal(
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
  ) : null;
};

