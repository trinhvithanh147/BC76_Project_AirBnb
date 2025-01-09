import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

const InputAdminLogin = ({
  placeholder,
  name,
  type = "text",
  onChange,
  onBlur,
  value,
  prefix,
  className = "",
  touched,
  error,
}) => {
  return (
    <div>
      <Input
        className={className}
        prefix={prefix}
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error ? <p className="text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default InputAdminLogin;
