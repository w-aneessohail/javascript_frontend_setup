import React from "react";

const CustomInputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInputField;
