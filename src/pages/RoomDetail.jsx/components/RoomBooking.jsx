import React from "react";
import { useContext } from "react";
import { AppContext } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DatePicker } from "antd";
import { useState } from "react";
import { InputNumber } from "antd";
const { RangePicker } = DatePicker;

const RoomBooking = ({ roomDetail, roomComment }) => {
  const navigate = useNavigate();
  console.log(roomComment);
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

  return (
    <div className="lg:sticky block top-0 w-full z-10 lg:h-96">
      <div className="flex flex-col space-y-5 m-0 p-6 lg:m-6 border border-[#D1D5DB] rounded-lg shadow-lg">
        {/* Giá tiền & Đánh giá  */}
        <div className="flex justify-between items-center">
          <p>
            <span className="font-bold">${roomDetail.giaTien} </span> / đêm
          </p>
          <p className=" duration-200 hover:underline hover:text-red-400 ">
            {roomComment.length} đánh giá
          </p>
        </div>
        {/* Thông tin đặt phòng  */}
        <div>
          {/* Checkin - Check-out  */}
          <div className="border-2 border-black rounded-t-lg px-4 py-6 space-y-2">
            <div className="grid grid-cols-2">
              <label className="font-bold " htmlFor="">
                Nhận phòng
              </label>
              <label className="font-bold " htmlFor="">
                Trả phòng
              </label>
            </div>
            <div>
              <RangePicker onChange={handleDateChange} className="w-full" />
            </div>
          </div>
          {/* Số lượng khách  */}
          <div className="flex flex-col border-2 border-black border-t-0 rounded-b-lg space-y-2 p-4">
            <label className="font-bold" htmlFor="">
              Số lượng khách
            </label>
            <InputNumber
              className="w-full"
              min={1}
              max={2}
              placeholder="khách"
            />
          </div>
        </div>
        {dates.length === 2 && (
          <>
            <div className="flex justify-between items-center px-4">
              <p className="font-bold">
                ${roomDetail.giaTien} x {nights} Đêm
              </p>
              <p className="font-extrabold">$ {roomDetail.giaTien * nights}</p>
            </div>
            <div className="flex justify-between items-center px-4">
              <p className="font-bold">Phí vệ sinh:</p>
              <p className="font-extrabold">$ 8</p>
            </div>
            <div className="flex justify-between items-center px-4">
              <p className="font-bold">Tổng tiền phòng trước thuế:</p>
              <p className="font-extrabold">
                {roomDetail.giaTien * nights + 8} $
              </p>
            </div>
          </>
        )}

        <button
          onClick={() => {
            // navigate(`/sign-in`);
          }}
          className="w-full py-2 rounded-lg text-white bg-[#FE6B6E] hover:shadow-2xl"
        >
          Đặt phòng
        </button>
      </div>
    </div>
  );
};

export default RoomBooking;
