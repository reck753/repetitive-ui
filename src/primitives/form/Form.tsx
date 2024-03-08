import { FormEvent, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  noValidate?: boolean;
  onSubmit: (e: FormEvent) => void;
  busy?: boolean;
  className?: string;
};

export const Form = ({
  children,
  noValidate = true,
  onSubmit,
  busy = false,
  className,
}: FormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!busy) {
      onSubmit(e);
    }
  };

  return (
    <form noValidate={noValidate} onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};
