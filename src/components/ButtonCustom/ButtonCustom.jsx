import React from "react";

const ButtonCustom = ({ buttonContent, type, className }) => {
  return (
    <div className="mt-8 w-full">
      <button type={type} className={className}>
        {buttonContent}
      </button>
    </div>
  );
};

export default ButtonCustom;
