import React from "react";
import { useContext } from "react";
import { NotificationContext } from "../../../App.jsx";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { useState } from "react";
import { datPhongService } from "../../../services/datPhong.service.js";
import { Input } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const RoomBooking = ({ roomDetail, roomComment }) => {
  const handleNotification = useContext(NotificationContext);
  // console.log(roomDetail);
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo);
  const navigate = useNavigate();
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

  const handleBooking = async () => {
    if (dates.length !== 2) {
      handleNotification(
        "error",
        "Vui lòng chọn đầy đủ ngày nhận phòng và trả phòng!",
        1500
      );
      return;
    }
    const bookingData = {
      id: 0,
      maPhong: roomDetail.id,
      ngayDen: dayjs(dates[0]).toISOString(),
      ngayDi: dayjs(dates[1]).toISOString(),
      soLuongKhach: roomDetail.khach,
      maNguoiDung: userInfo.user.id,
    };
    console.log(bookingData);
    try {
      const response = await datPhongService.themDatPhong(bookingData);
      console.log(response);
      console.log(response.data.message);
      handleNotification("success", "Đặt phòng thành công", 1500);
    } catch (error) {
      handleNotification("error", "Có lỗi xảy ra. Vui lòng thử lại!", 1500);
    }
  };

  return (
    <div
      className="lg:sticky block top-0 w-full z-10"
      style={{ maxHeight: "31rem" }}
    >
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
            <Input value={roomDetail.khach} className="border-none" />
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
            handleBooking();
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
