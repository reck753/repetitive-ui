"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { UnstyledButton } from "../button/UnstyledButton";
import { Div } from "../div/Div";
import { Input } from "./Input";
import { cn } from "@repetitive-ui/utils";

type PasswordInputProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  toggleClassName?: string;
};

export const PasswordInput = ({
  name,
  value,
  defaultValue,
  onChange,
  placeholder = "Password",
  autoFocus,
  className,
  inputClassName,
  toggleClassName,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Div className={cn("flex gap-2 relative", className)}>
      <Input
        name={name}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cn("pr-12", inputClassName)}
        autoFocus={autoFocus}
      />
      <UnstyledButton
        onClick={() => setShowPassword((prev) => !prev)}
        className={cn(
          "absolute size-9 flex items-center justify-center right-0 border-l rounded-r-md",
          toggleClassName
        )}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </UnstyledButton>
    </Div>
  );
};
