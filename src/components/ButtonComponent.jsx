import React from "react";

const ButtonComponent = ({ styles, children }) => {
  return <button className={styles}>{children}</button>;
};

export default ButtonComponent;
