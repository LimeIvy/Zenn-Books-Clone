import { FC, HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ children, className, size, ...props }) => {
  const spinnerClasses =
    "animate-spin border-4 border-blue-500 rounded-full border-t-transparent " +
    className;

  return (
    <div className={spinnerClasses} style={size ? { width: `${size}px`, height: `${size}px` } : undefined} {...props}>
      {children}
    </div>
  );
};

export default Spinner;
