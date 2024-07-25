import React, { useState } from "react";
import RevertIcon from "../assets/RevertIcon";
import classes from "./swapButton.module.css";

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(true);
    setIsRotated(true);
    onClick();
    setTimeout(() => {
      setIsActive(false);
      setIsRotated(false);
    }, 400);
  };

  return (
    <button disabled={isActive} className={`${classes.revert} ${isActive ? classes.active : ""}`} onClick={handleClick}>
      <div className={`${classes.image} ${isRotated ? classes.rotate : ""}`}>
        <RevertIcon color="#FBA1B7" size="32" />
      </div>
    </button>
  );
};

export default SwapButton;
