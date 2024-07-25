import React from "react";
import classes from "./tokensToChoice.module.css";

interface TokensToChoiceProps {
  dataToken: { [key: string]: Token };
  handleTokenSelect: (token: Token) => void;
}

const TokensToChoice: React.FC<TokensToChoiceProps> = ({ dataToken, handleTokenSelect }): React.JSX.Element => {
  return (
    <div className={classes.optionsFrame}>
      {Object.keys(dataToken).map((key, index) => {
        const { LogoComponent, name } = dataToken[key];
        return (
          <div key={index} className={classes.optionItem} onClick={() => handleTokenSelect(dataToken[key])}>
            <div className={classes.image}>{<LogoComponent width={30} height={30} />}</div>
            <p className={classes.name}>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TokensToChoice;
