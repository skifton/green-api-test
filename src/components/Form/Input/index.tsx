import React from "react";
import clsx from "clsx";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  wrapperClassName?: string;
  className?: string;
  error?: boolean;
  helperText?: string;
  textarea?: boolean;
}

const Input: React.FC<IProps> = ({
  wrapperClassName,
  className,
  error,
  helperText,
  textarea,
  ...props
}) => {
  return (
    <div className={wrapperClassName}>
      {!textarea ? (
        <input
          className={clsx(
            "w-full border-b-2 border-black outline-none text-xl py-1 active:border-emerald-500 focus:border-emerald-500",
            {
              "border-red-500": error,
            },
            className
          )}
          {...props}
        />
      ) : (
        <textarea
          className={clsx(
            "w-full border-b-2 border-black outline-none text-xl py-1 active:border-emerald-500 focus:border-emerald-500",
            {
              "border-red-500": error,
            },
            className
          )}
          {...props}
        />
      )}
      {error && <p className="flex text-sm text-red-500">{helperText}</p>}
    </div>
  );
};

export default Input;
