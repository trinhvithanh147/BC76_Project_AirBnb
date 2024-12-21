import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

const InputAdminLogin = ({
  labelContent,
  placeholder,
  id,
  name,
  type,
  onChange,
  onBlur,
  value,
  prefix,
  className = "",
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
    </div>
  );
};

export default InputAdminLogin;
