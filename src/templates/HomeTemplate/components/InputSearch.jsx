import { Input } from "antd";
import React from "react";

const InputSearch = ({
  placeholder,
  handelChangeKeyword,
  value,
  handelClickInputSearch,
}) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={handelChangeKeyword}
      value={value}
      onClick={handelClickInputSearch}
    />
  );
};

export default InputSearch;
