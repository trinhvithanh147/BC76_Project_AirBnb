import React from "react";
import Icon from "../../../components/Icon";

const ButtonFilter = () => {
  return (
    <div>
      <button className="flex justify-between items-center space-x-1 border border-[#BFBFBF]  px-4 py-4 rounded-xl">
        <Icon.iconFilters />
        <span className="text-xs font-medium">Bộ lọc</span>
      </button>
    </div>
  );
};

export default ButtonFilter;
