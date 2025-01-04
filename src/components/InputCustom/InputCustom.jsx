import { Input } from "antd";
import React from "react";

const InputCustom = ({
  labelContent,
  id,
  name,
  type = "text",
  placeholder,
  handleBlur,
  handleChange,
  value,
  error,
  touched,
}) => {
  return (
    <div className="space-y-1">
      <label className="font-bold mb-1 inline-block" htmlFor="">
        {labelContent}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
      {touched && error ? <p className="text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default InputCustom;
