import React from "react";

const TextArea = ({ label, labelFor, id, ...rest }) => {
  return (
    <div className="input_group">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...rest}/>
    </div>
  );
};

export default TextArea;
