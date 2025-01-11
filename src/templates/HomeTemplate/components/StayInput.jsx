import React from "react";
import { DatePicker } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
import "./stayInput.scss";

const StayInput = () => {
  const [dates, setDates] = useState([]);
  const [nights, setNights] = useState(0);

  const handleDateChange = (values) => {
    if (values) {
      const [startDate, endDate] = values;
      setDates([startDate, endDate]);

      // Tính số đêm lưu trú
      const diffInNights = endDate.diff(startDate, "days");
      setNights(diffInNights);
    } else {
      setDates([]);
      setNights(0);
    }
  };
  const disabledDate = (current) => {
    // Tắt các ngày ngoài tháng hiện tại
    return current && current.month() !== new Date().getMonth();
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <label className="font-thin" htmlFor="">
          Nhận phòng
        </label>
        <label className="font-thin" htmlFor="">
          Trả phòng
        </label>
      </div>
      <div className="range-picker-container">
        <RangePicker
          onChange={handleDateChange}
          placeholder={["Nhận phòng", "Trả phòng"]}
        />
      </div>
    </div>
  );
};

export default StayInput;
