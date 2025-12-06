import { FC, HTMLAttributes } from "react";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ children, className, ...props }) => {
  const spinnerClasses =
    "animate-spin border-4 border-blue-500 rounded-full border-t-transparent " +
    `w-${props.size} h-${props.size} ` +
    className;

  return (
    <div className={spinnerClasses} {...props}>
      {children}
    </div>
  );
};

export default Spinner;
