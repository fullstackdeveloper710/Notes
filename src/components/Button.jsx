import React from "react";

const Button = ({ type, label, ...rest }) => {
  return (
    <button type={type} {...rest}>
      {label}
    </button>
  );
};

export default Button;
