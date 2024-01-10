import React, { HTMLAttributes, ReactNode, useEffect, useRef } from "react";

/**
 * Hook that handles clicks outside of the passed ref
 */
function useClickOutsideListener(
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside?: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that handles clicks outside of the wrapped component
 */
interface ClickOutsideListenerProps extends HTMLAttributes<HTMLDivElement> {
  onClickOutside?: () => void;
  children: ReactNode;
}

const ClickOutsideListener: React.FC<ClickOutsideListenerProps> = ({
  children,
  onClickOutside,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useClickOutsideListener(wrapperRef, onClickOutside);

  return (
    <div ref={wrapperRef} {...props}>
      {children}
    </div>
  );
};

export default ClickOutsideListener;
