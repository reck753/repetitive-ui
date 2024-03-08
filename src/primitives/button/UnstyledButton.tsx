import React, { MouseEvent, ReactNode } from "react";

type UnstyledButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const UnstyledButton = ({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
}: UnstyledButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button onClick={handleClick} className={className} type={type}>
      {children}
    </button>
  );
};
