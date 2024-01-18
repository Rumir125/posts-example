import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: React.ReactNode;
  popupProps?: HTMLAttributes<HTMLDialogElement>;
}

function Modal({ open, children, popupProps, ...props }: ModalProps) {
  if (!open) return null;

  return (
    <div className="Modal__background" {...props}>
      <dialog className="modal Modal__wrapper" {...popupProps}>
        {children}
      </dialog>
    </div>
  );
}

export default withLogger(Modal);
