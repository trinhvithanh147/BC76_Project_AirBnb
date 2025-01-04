import React from "react";
import Icon from "../../../components/Icon";
import { useEffect } from "react";
import { phongService } from "../../../services/phong.service";
import { useState } from "react";
import { binhLuanService } from "../../../services/binhLuan.service";
import RoomBooking from "./RoomBooking";

const RoomInfo = ({ roomName, guest, bedroom, bed, bathroom, roomDetail }) => {
  const [comment, setComment] = useState([]);
  const getActiveUtilities = (data) => {
    const utilitiesMap = {
      banLa: "Bàn là",
      banUi: "Bàn ủi",
      bep: "Bếp",
      dieuHoa: "Điều hòa",
      doXe: "Chỗ đỗ xe",
      hoBoi: "Hồ bơi",
      mayGiat: "Máy giặt",
      tivi: "Tivi",
      wifi: "Wifi",
    };
    return Object.keys(utilitiesMap)
      .filter((key) => data[key]) // Lọc các key có giá trị true
      .map((key) => utilitiesMap[key]); // Chuyển key thành tên tiện ích
  };
  const activeUtilities = getActiveUtilities(roomDetail);

  useEffect(() => {
    binhLuanService
      .getBinhLuanTheoMaPhong(roomDetail.id)
      .then((res) => {
        console.log(res.data.content);
        setComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomDetail.id]);
  return (
    <div className="container">
      <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* thông tin phòng  */}
        <div>
          <div className="space-y-2 pb-4 ">
            <h1 className="text-xl font-bold ">{roomName}</h1>
            <p className="font-thin">
              {guest} Khách • {bedroom} Phòng ngủ • {bed} Giường • {bathroom}{" "}
              Phòng tắm
            </p>
          </div>
          <div className="flex flex-col py-5 space-y-5 border-y-2">
            <div className="flex items-center gap-5">
              <Icon.iconHouse />
              <div>
                <h1 className="font-bold">Toàn bộ nhà</h1>
                <p>Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <Icon.iconBroom />
              <div>
                <h1 className="font-bold">Vệ sinh tăng cường</h1>
                <p>
                  Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường
                  5 bước của Airbnb.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <Icon.iconCup />
              <div>
                <h1 className="font-bold">Phong là Chủ nhà siêu cấp</h1>
                <p>
                  Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh
                  giá cao và là những người cam kết mang lại quãng thời gian ở
                  tuyệt vời cho khách.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <Icon.iconBroom />
              <div>
                <h1 className="font-bold">Miễn phí hủy trong 48 giờ</h1>
              </div>
            </div>
          </div>
          <div className="py-6 border-b-2 flex flex-col space-y-4">
            <button className="w-full px-5 py-3  border-2 border-black  rounded-lg flex justify-between items-center ">
              <span>Dịch sang tiếng Anh</span>
              <Icon.iconTranslate />
            </button>
            <p>
              Emmy là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh
              nghiệm, được đánh giá cao và là những người cam kết mang lại quãng
              thời gian ở tuyệt vời cho khách. Trải nghiệm nhận phòng tuyệt vời
              100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng. Hủy
              miễn phí trước 28 thg 9.
            </p>
            <p className="font-bold underline">Hiển thị thêm</p>
          </div>
          <div className="py-6  space-y-4">
            <h1 className="text-xl font-bold">Các tiện ích đi kèm</h1>
            <div className="grid grid-cols-2 gap-2 font-thin">
              {activeUtilities.map((utility, index) => (
                <div key={index} className="font-extralight">
                  {utility}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* đặt phòng & thanh toán  */}
        <RoomBooking roomDetail={roomDetail} roomComment={comment} />
      </div>
      {/* bình luận  */}
      <div className="py-5 border-t-2 border-b-2">
        <div className="border border-yellow-300 rounded-lg px-5 py-2 bg-[#FFFBE6] text-sm">
          Cần đăng nhập để bình luận
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold py-4">Bình luận</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-80 overflow-y-scroll gap-4">
          {comment.map((item, index) => {
            return (
              <div key={index} className="flex flex-col space-y-2 ">
                <div className=" flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                  <div className="">
                    <div className="flex items-center space-x-2">
                      <p className="font-bold">{item.tenNguoiBinhLuan}</p>
                      <p className="">{item.saoBinhLuan}</p>
                      <p>
                        <Icon.iconStar />
                      </p>
                    </div>
                    <p>{item.ngayBinhLuan}</p>
                  </div>
                </div>
                <div className="font-extralight">{item.noiDung}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
