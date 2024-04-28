import React from "react";

const ButtonComponent = ({ styles, children, handleClick }) => {
  return (
    <button onClick={handleClick} className={styles}>
      {children}
    </button>
  );
};

export default ButtonComponent;
