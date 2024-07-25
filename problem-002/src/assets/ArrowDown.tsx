import React from "react";

interface ArrowDownProps {
  color?: string;
  size?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({ color = "black", size = "24" }): React.JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8L12 16L20 8" stroke={color} />
    </svg>
  );
};

export default ArrowDown;
