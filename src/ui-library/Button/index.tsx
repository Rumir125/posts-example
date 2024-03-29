import { ButtonHTMLAttributes, SVGProps, useMemo } from "react";
import { ICONS, IconType } from "../icons";
import "./style.css";

// TODO: Add a new variant for the button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  icon?: IconType;
  iconProps?: SVGProps<SVGSVGElement>;
}

function Button({ children, variant, icon, iconProps, ...props }: ButtonProps) {
  const IconComponent = useMemo(
    () =>
      icon
        ? ICONS({
            height: "20px",
            width: "20px",
            className: "Button_Icon",
            fill: variant === "primary" ? "#fff" : "#3f80ff",
            ...iconProps,
          })[icon]
        : null,
    [icon, iconProps, variant]
  );

  return (
    <button
      className={`PostsExample__button  PostsExample__button--${variant}`}
      {...props}
    >
      <div className="PostsExample__button_container">
        {IconComponent}
        {children}
      </div>
    </button>
  );
}

export default Button;
