import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  open: boolean;
  children: React.ReactNode;
}

function Modal({ open, children, ...props }: ModalProps) {
  if (!open) return null;

  return (
    <dialog className="Modal__wrapper" {...props}>
      {children}
    </dialog>
  );
}

export default withLogger(Modal);
