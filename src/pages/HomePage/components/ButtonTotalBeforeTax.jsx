import React from "react";
import { Switch } from "antd";

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const ButtonTotalBeforeTax = () => {
  return (
    <div>
      <button className="flex justify-between items-center space-x-3 border border-[#BFBFBF] px-4 py-3 rounded-xl">
        <span className="text-xs font-medium">Hiển thị tổng trước thuế</span>
        <Switch className="text-[#BFBFBF]" defaultChecked onChange={onChange} />
      </button>
    </div>
  );
};

export default ButtonTotalBeforeTax;
