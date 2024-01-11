import { ButtonHTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

function Button({ children, variant, ...props }: ButtonProps) {
  const buttonVariant =
    variant === "primary"
      ? "PostsExample__button--primary"
      : "PostsExample__button--secondary";
  return (
    <button className={` PostsExample__button ${buttonVariant}`} {...props}>
      {children}
    </button>
  );
}

export default withLogger(Button);
