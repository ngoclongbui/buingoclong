import React from "react";

interface RevertIconProps {
  color?: string;
  size?: string;
}

const RevertIcon: React.FC<RevertIconProps> = ({ color = "black", size = "24" }): React.JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 13.8H1.26316L7.32632 21" stroke={color} strokeWidth="1.15" />
      <path d="M0 10.2H22.7368L16.6737 3" stroke={color} strokeWidth="1.15" />
    </svg>
  );
};

export default RevertIcon;
