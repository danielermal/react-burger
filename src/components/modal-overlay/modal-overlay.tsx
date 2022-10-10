import { FC, ReactNode } from "react";
import modal from "./modal-overlay.module.css";

type TModalOverlay = {
  children: ReactNode;
  close?: (() => void) | null;
};

export const ModalOverlay: FC<TModalOverlay> = (props) => {
  return (
    <div
      className={
        props.close ? modal.overlay : `${modal.overlay} ${modal.overlay_black}`
      }
      onClick={props.close ? props.close : () => null}
    >
      {props.children}
    </div>
  );
};
