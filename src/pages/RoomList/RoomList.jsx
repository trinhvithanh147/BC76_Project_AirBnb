import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { phongService } from "../../services/phong.service";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { viTriService } from "../../services/viTri.service";
import RoomItem from "./components/RoomItem";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [location, setLocation] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    phongService
      .getPhongTheoMaViTri(id)
      .then((res) => {
        console.log(res.data.content);
        setRoomList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    viTriService
      .getViTriById(id)
      .then((res) => {
        setLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(roomList);
  return (
    <div className="container">
      <div className="py-10 grid grid-cols-2 gap-5">
        {/* Left : Roomlist  */}
        <div className="flex flex-col space-y-4">
          {/* Title  */}
          <div>
            <p className="">
              Có <span className="font-semibold">{roomList.length}</span> chỗ ở
              tại <span className="font-semibold">{location.tinhThanh}</span>
            </p>
            <h1 className="text-2xl font-bold">
              Chỗ ở tại khu vực bản đồ đã chọn
            </h1>
          </div>
          {/* Roomlist  */}
          <div className="space-y-4">
            {roomList.map((item, index) => {
              return (
                <div
                  className="p-5 border rounded-md hover:cursor-auto hover:shadow-lg "
                  key={index}
                >
                  <RoomItem
                    nameLocation={location.tinhThanh}
                    roomImage={item.hinhAnh}
                    roomName={item.tenPhong}
                    bedroom={item.phongNgu}
                    bathroom={item.phongTam}
                    bed={item.giuong}
                    guest={item.khach}
                    price={item.giaTien}
                    roomCode={item.id}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right : Map  */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31355.309943079308!2d106.67114475000001!3d10.779589600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1735380422583!5m2!1sen!2s"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomList;
