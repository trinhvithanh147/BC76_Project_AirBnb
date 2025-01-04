import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { phongService } from "../../services/phong.service";

const RoomItem = () => {
  const [listRoom, setListRoom] = useState([]);
  useEffect(() => {
    phongService
      .getPhong()
      .then((res) => {
        console.log(res.data.content);
        setListRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const exchangeRate = 25000;
  return (
    <div className="grid grid-cols-4 gap-8">
      {listRoom.slice(0, 20).map((item, index) => {
        return (
          <div key={index}>
            <img src={item.hinhAnh} alt="" />
            <h1 className="truncate font-semibold">{item.tenPhong}</h1>
            <p className="truncate font-thin text-sm">{item.moTa}</p>
            <p className="text-red-500 font-bold">
              {(item.giaTien * exchangeRate).toLocaleString()}vnd
              <span className="text-red-500 font-thin">/đêm</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RoomItem;
