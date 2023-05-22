import React from "react";

interface IProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-gray-300">
      <div className="absolute w-full h-screen">{children}</div>
      <div className="w-full h-32 bg-emerald-500" />
    </div>
  );
};

export default BackgroundWrapper;
