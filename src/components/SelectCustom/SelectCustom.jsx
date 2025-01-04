import { Select } from "antd";
import React from "react";

const SelectCustom = ({
  labelContent,
  placeholder,
  options,
  handleChange,
  mode,
  value,
  touched,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label className="font-bold mb-1 inline-block" htmlFor="">
        {labelContent}
      </label>
      <Select
        className="w-full"
        options={options}
        onChange={handleChange}
        mode={mode && mode}
        value={value}
        placeholder={placeholder}
      />
      {touched && error ? <p className="text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default SelectCustom;
