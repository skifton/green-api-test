import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton: React.FC<IProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default IconButton;
