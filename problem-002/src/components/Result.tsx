import React, { useEffect, useRef } from "react";
import classes from "./result.module.css";

const Result: React.FC<{ value: string }> = ({ value }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeFont = () => {
      const element = textRef.current;
      if (element) {
        const parentWidth = element.parentElement?.clientWidth || 0;
        let fontSize = 64;
        element.style.fontSize = `${fontSize}px`;
        while (element.scrollWidth > parentWidth && fontSize > 10) {
          fontSize -= 1;
          element.style.fontSize = `${fontSize}px`;
        }
      }
    };

    resizeFont();
    window.addEventListener("resize", resizeFont);

    return () => {
      window.removeEventListener("resize", resizeFont);
    };
  }, [value]);

  return (
    <div className={classes.resultFrame}>
      <span ref={textRef} className={classes.result}>
        {value}
      </span>
    </div>
  );
};

export default Result;
