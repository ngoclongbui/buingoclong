import React from "react";
import classes from "./loading.module.css";
import LoadingIcon from "../assets/LoadingIcon";

const Loading: React.FC = (): React.JSX.Element => {
  return (
    <div className={classes.loading}>
      <div className={classes.image}>{<LoadingIcon color="#7ab2b2" size="30" />}</div>
    </div>
  );
};
export default Loading;
