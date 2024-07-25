import React from "react";
import classes from "./tokenSelected.module.css";
import ArrowDown from "../assets/ArrowDown";
import { Selection } from "../enums/converterEnum";

interface TokenSelectedProps {
  value: Token;
  selection: Selection | null;
  type: Selection;
  handleChangeSelection: (selection: Selection | null) => void;
}

const TokenSelected: React.FC<TokenSelectedProps> = ({
  value,
  type,
  selection,
  handleChangeSelection,
}): React.JSX.Element => {
  const { LogoComponent } = value;
  const isSelection = selection === type;
  const handleClick = (): void => {
    if (isSelection) {
      handleChangeSelection(null);
    } else {
      handleChangeSelection(type);
    }
  };

  return (
    <div onClick={handleClick} className={`${classes.selectFrame} ${isSelection ? classes.active : ""}`}>
      <div className={classes.image}>{<LogoComponent width={30} height={30} />}</div>
      <p className={classes.name}>{value.name}</p>
      <div className={`${classes.logo} ${isSelection ? classes.active : ""}`}>
        <ArrowDown />
      </div>
    </div>
  );
};

export default TokenSelected;
