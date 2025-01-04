import React from "react";
import { useNavigate } from "react-router-dom";

const RoomItem = ({
  nameLocation,
  roomImage,
  roomName,
  bedroom,
  bathroom,
  bed,
  guest,
  price,
  roomCode,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/room-detail/${roomCode}`);
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-5 hover:cursor-pointer"
    >
      <div className="w-full">
        <img
          className="object-cover w-full rounded-lg h-40"
          src={roomImage}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col ">
          <p className="text-gray-700 font-semibold text-sm">
            Toàn bộ căn hộ dịch vụ tại {nameLocation}
          </p>

          <h1 className="text-[#EF4444] font-semibold text-xl truncate">
            {roomName}
          </h1>
          <p className="font-thin">
            {bedroom} phòng ngủ • {bathroom} phòng tắm
          </p>
          <p className="font-thin">
            {bed} giường • {guest} khách
          </p>
        </div>
        <div className="text-right">
          <p>
            <span className="font-bold text-sm">$ {price}</span> / đêm
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
