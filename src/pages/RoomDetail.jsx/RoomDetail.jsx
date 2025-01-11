import React from "react";
import Icon from "../../components/Icon";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { phongService } from "../../services/phong.service";
import Item from "antd/es/list/Item";
import { viTriService } from "../../services/viTri.service";
import RoomInfo from "./components/RoomInfo";
import "./roomDetail.scss";
const RoomDetail = () => {
  const [roomDetail, setRoomDetail] = useState({});
  const [location, setLocation] = useState({});
  const { id } = useParams();

  useEffect(() => {
    phongService
      .getPhongTheoMaPhong(id)
      .then((res) => {
        console.log(res.data.content);
        setRoomDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    viTriService
      .getViTriById(roomDetail.maViTri)
      .then((res) => {
        // console.log(res.data.content);
        setLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomDetail.maViTri]);
  return (
    <div className="room-detail container my-10">
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl font-bold text-[#EF4444]">
          {roomDetail.tenPhong}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Icon.iconAward />
            <span>Chủ nhà siêu cấp</span>
          </div>
          <span className="text-red-400 ">
            {location.tenViTri}, {location.tinhThanh}
          </span>
        </div>
        <img
          className="object-cover w-full rounded-lg"
          src={roomDetail.hinhAnh}
          alt=""
        />
      </div>
      <div>
        <RoomInfo
          roomName={roomDetail.tenPhong}
          guest={roomDetail.khach}
          bedroom={roomDetail.phongNgu}
          bed={roomDetail.giuong}
          bathroom={roomDetail.phongTam}
          roomDetail={roomDetail}
        />
      </div>
    </div>
  );
};

export default RoomDetail;
