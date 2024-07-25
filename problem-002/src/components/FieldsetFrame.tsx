import React from "react";
import classes from "./fieldsetFrame.module.css";

interface FieldsetFrameProps {
  children: React.ReactNode;
  title: string;
}

const FieldsetFrame: React.FC<FieldsetFrameProps> = ({ children, title }) => {
  return (
    <div className={classes.container}>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}>{title}</legend>
        <div className={classes.contentFrame}>{children}</div>
      </fieldset>
    </div>
  );
};

export default FieldsetFrame;
