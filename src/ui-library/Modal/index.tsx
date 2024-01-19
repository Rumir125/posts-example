import { HTMLAttributes } from "react";
import { ClickOutsideListener } from "..";
import "./style.css";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  popupProps?: HTMLAttributes<HTMLDialogElement>;
  onClose?: () => void;
}

function Modal({ open, children, popupProps, onClose, ...props }: ModalProps) {
  if (!open) return null;

  return (
    <div className="Modal__background" {...props}>
      <dialog className="modal Modal__wrapper" {...popupProps}>
        <ClickOutsideListener
          onClickOutside={() => {
            onClose?.();
          }}
          style={{ height: "100%", width: "100%" }}
        >
          {children}
        </ClickOutsideListener>
      </dialog>
    </div>
  );
}

export default Modal;
