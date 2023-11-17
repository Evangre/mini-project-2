import React from "react";

const FormField = ({ label, type, ...props }) => {
  return (
    <label>
      {label}:
      <input type={type} {...props} />
    </label>
  );
};

export default FormField;
