import React from "react";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const StayInput = ({ setCheckIn, setCheckOut }) => {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const handleDateChange = (item) => {
    setRange([item.selection]);
  };
  const handleConfirm = () => {
    setCheckIn(
      range[0].startDate ? format(range[0].startDate, "dd/MM/yyyy") : ""
    );
    setCheckOut(range[0].endDate ? format(range[0].endDate, "dd/MM/yyyy") : "");
    setShowDateRangePicker(false); // Đóng DateRangePicker
  };
  return (
    <div className="relative">
      <div
        className="flex  items-center space-x-5 cursor-pointer"
        onClick={() => {
          setShowDateRangePicker(true);
        }}
      >
        {/* Nhận phòng  */}
        <div className="flex flex-col ">
          <label
            className="mb-1 text-md font-thin md:hidden lg:block"
            htmlFor=""
          >
            Nhận phòng
          </label>
          <input
            readOnly
            type="text"
            placeholder="Chọn ngày"
            value={
              range[0].startDate ? format(range[0].startDate, "dd/MM/yyyy") : ""
            }
            className="w-full text-md font-semibold cursor-pointer focus:outline-none"
          />
        </div>
        {/* Trả phòng  */}
        <div className="flex flex-col ">
          <label className="mb-1 text-md font-thin hidden lg:block" htmlFor="">
            Trả phòng
          </label>
          <input
            readOnly
            type="text"
            placeholder="Chọn ngày"
            value={
              range[0].endDate ? format(range[0].endDate, "dd/MM/yyyy") : ""
            }
            className="w-full text-md font-semibold focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* hiển thị DateRangePicker */}
      {showDateRangePicker && (
        <div className="absolute overflow-y-auto w-full z-10 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <DateRangePicker
            ranges={range}
            onChange={handleDateChange}
            rangeColors={["#FF385C"]}
          />
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
};

export default StayInput;
