import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { viTriService } from "../../services/viTri.service";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [locationList, setLocationList] = useState([]);
  const navigate = useNavigate();
  const arrLocation = [
    {
      id: 1,
      label: "Hồ Chí Minh",
      distance: "15 phút lái xe",
      image: "/hochiminh.webp",
    },
    {
      id: 2,
      label: "Cần Thơ",
      distance: "3 giờ lái xe",
      image: "/cantho.webp",
    },
    {
      id: 3,
      label: "Nha Trang",
      distance: "6 giờ lái xe",
      image: "/nhatrang.webp",
    },
    {
      id: 4,
      label: "Hà Nội",
      distance: "12 giờ lái xe",
      image: "/hanoi.webp",
    },
    {
      id: 5,
      label: "Phú Quốc",
      distance: "9 giờ lái xe",
      image: "/phuquoc.webp",
    },
    {
      id: 6,
      label: "Đà Nẵng",
      distance: "45 phút lái xe",
      image: "/danang.webp",
    },
    {
      id: 7,
      label: "Đà Lạt",
      distance: "30 phút lái xe",
      image: "/dalat.webp",
    },
    {
      id: 8,
      label: "Phan Thiết",
      distance: "5 giờ lái xe",
      image: "/phanthiet.webp",
    },
  ];

  const arrUltilities = [
    {
      label: "Toàn bộ nhà",
      image: "/toanbonha.webp",
    },
    {
      label: "Chỗ ở độc đáo",
      image: "/cho_o_doc_dao.webp",
    },
    {
      label: "Trang trại và thiên nhiên",
      image: "/trangtrai.webp",
    },
    {
      label: "Cho phép mang thú cưng",
      image: "/thucung.webp",
    },
  ];

  return (
    <div className="container">
      <div className="py-20">
        <div className="grid grid-cols-4 gap-3">
          {arrLocation.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`room-list/${item.id}`);
                }}
                className="flex justify-start items-center gap-5 px-3 py-4 border rounded-md hover:cursor-pointer hover:shadow-lg duration-500"
              >
                <img className="w-12 h-12 rounded-md" src={item.image} alt="" />
                <div className="flex flex-col">
                  <p className="font-bold">{item.label}</p>
                  <p className="font-thin">{item.distance}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-5">Ở bất cứ nơi đâu</h1>
          <div className="grid grid-cols-4 gap-5  ">
            {arrUltilities.map((item, index) => {
              return (
                <div className="cursor-pointer hover:shadow-lg duration-500">
                  <div>
                    <img
                      className="w-30 h-30 rounded-t-md"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="border py-5 px-3 rounded-b-md">
                    <p className="font-bold">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
