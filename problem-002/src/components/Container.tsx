import React from "react";
import classes from "./container.module.css";

interface PropsContainer {
  children: React.ReactNode;
}

const Container: React.FC<PropsContainer> = ({ children }): React.JSX.Element => {
  return <main className={classes.main}>{children}</main>;
};

export default Container;
