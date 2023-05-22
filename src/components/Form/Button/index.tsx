import React from "react";
import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-emerald-500 px-5 py-3 text-white font-medium hover:opacity-80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
