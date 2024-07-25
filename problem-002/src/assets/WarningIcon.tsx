import React from "react";

interface WarningIconProps {
  color?: string;
  size?: string;
}

const WarningIcon: React.FC<WarningIconProps> = ({ color = "black", size = "24" }): React.JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20L12 4L21 20H3Z" stroke={color} />
      <path d="M12 8V15" stroke={color} />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
};

export default WarningIcon;
