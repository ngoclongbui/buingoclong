import React, { useRef, useEffect } from "react";

interface ClickOutsideHandlerProps {
  onClickOutside: () => void;
  children: React.ReactNode;
}

const ClickOutsideHandler: React.FC<ClickOutsideHandlerProps> = ({ onClickOutside, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideHandler;
