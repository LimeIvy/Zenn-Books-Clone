import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visual?: "primary" | "secondary";
  href?: string;
  noop?: boolean;
}

const Button: FC<ButtonProps> = ({
  visual = "primary",
  children,
  className,
  noop = false,
  ...props
}) => {
  const buttonClasses =
    "flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white cursor-pointer rounded-full " +
    (visual === "primary"
      ? "bg-button-primary hover:bg-button-primary-hover"
      : "") +
    " " +
    className;

  if (noop) {
    return (
      <span className={buttonClasses} tabIndex={-1}>
        {children}
      </span>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
