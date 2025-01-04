import React from "react";
import Slider from "react-slick";
import "./carouselBar.scss";
import Icon from "../../../components/Icon";
import { pathDefault } from "../../../common/path";
import { Link } from "react-router-dom";

// Tạo component nút prev tùy chỉnh
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-prev" onClick={onClick}>
      &#60; {/* Đây là dấu mũi tên trái */}
    </button>
  );
};

// Tạo component nút next tùy chỉnh
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-next" onClick={onClick}>
      &#62; {/* Đây là dấu mũi tên phải */}
    </button>
  );
};

const CarouselBar = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Sử dụng nút prev tùy chỉnh
    nextArrow: <NextArrow />, // Sử dụng nút next tùy chỉnh
  };

  const iconsCarouselBar = [
    {
      title: "Ấn tượng",
      icon: "/an_tuong.jpg",
    },
    {
      title: "Biệt thự",
      icon: "/biet_thu.jpg",
    },
    {
      title: "Biểu tượng",
      icon: "/bieu_tuong.jpg",
    },
    {
      title: "Cabin",
      icon: "/ca_bin.jpg",
    },
    {
      title: "Container",
      icon: "/container.jpg",
    },
    {
      title: "Đảo",
      icon: "/dao.jpg",
    },
    {
      title: "golf",
      icon: "/golf.jpg",
    },
    {
      title: "Hanok",
      icon: "/hanok.jpg",
    },
    {
      title: "Hồ Bơi",
      icon: "/ho_boi.jpg",
    },
    {
      title: "Hồ",
      icon: "/ho.jpg",
    },
    {
      title: "Hồ",
      icon: "/ho.jpg",
    },
    {
      title: "Hướng Biển",
      icon: "/huong_bien.jpg",
    },
    {
      title: "Khung cảnh",
      icon: "/khung_canh.jpg",
    },
    {
      title: "Lâu đài",
      icon: "/lau_dai.jpg",
    },
    {
      title: "Lều",
      icon: "/leu.jpg",
    },
    {
      title: "Luxe",
      icon: "/luxe.jpg",
    },
    {
      title: "Nhà dưới lòng đất",
      icon: "/nha_duoi_long_dat.jpg",
    },
    {
      title: "Nhà khung",
      icon: "/nha_khung.jpg",
    },
    {
      title: "Nhà nhỏ",
      icon: "/nha_nho.jpg",
    },
    {
      title: "Nhà trên cây",
      icon: "/nha_tren_cay.jpg",
    },
    {
      title: "Nhà khung",
      icon: "/nha_khung.jpg",
    },
    {
      title: "Nông thôn",
      icon: "/nong_thon.jpg",
    },
    {
      title: "Nhà khung",
      icon: "/nha_khung.jpg",
    },
    {
      title: "Nông trại",
      icon: "/nong_trai.jpg",
    },
    {
      title: "Phòng",
      icon: "/phong.jpg",
    },
    {
      title: "Piano",
      icon: "/piano.jpg",
    },
  ];

  return (
    <div
      className="slider-container w-3/4
    "
    >
      <Slider className="flex gap-4" {...settings}>
        {iconsCarouselBar.map((item, index) => {
          return (
            <div>
              <Link
                className="!flex flex-col justify-between items-center"
                to={pathDefault.homePage}
              >
                <img className="w-6 h-6 " src={item.icon} alt="" />
                <p className="text-sm ">{item.title}</p>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselBar;
