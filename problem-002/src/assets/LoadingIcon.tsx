import React from "react";

interface LoadingIconProps {
  color?: string;
  size?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ color = "black", size = "24" }): React.JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 12C21 10.22 20.4722 8.47991 19.4832 6.99987C18.4943 5.51983 17.0887 4.36627 15.4442 3.68508C13.7996 3.0039 11.99 2.82567 10.2442 3.17293C8.49836 3.5202 6.89471 4.37737 5.63604 5.63604C4.37737 6.89471 3.5202 8.49836 3.17293 10.2442C2.82567 11.99 3.0039 13.7996 3.68508 15.4442C4.36627 17.0887 5.51983 18.4943 6.99987 19.4832C8.47991 20.4722 10.22 21 12 21"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  );
};

export default LoadingIcon;
