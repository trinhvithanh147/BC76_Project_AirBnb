import React from "react";
import Icon from "../../../components/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import "./headerTemplate.scss";
import SearchBar from "./SearchBar";

const HeaderTemplate = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <header className="relative py-5 border-none flex flex-col ">
        {/* Header bar  */}
        <div className="container flex justify-between items-center">
          {/* Logo  */}
          <NavLink to={pathDefault.homePage}>
            <Icon.logoHeader />
          </NavLink>
          {/* Navbar  */}
          <div className="flex justify-between items-center space-x-10">
            <NavLink
              to={pathDefault.homePage}
              className={({ isActive }) => {
                return `text-white text-xl font-semibold hover:text-[#FE6B6E] ${
                  isActive ||
                  location.pathname == "/" ||
                  location.pathname == ""
                    ? "item-active"
                    : ""
                }`;
              }}
            >
              Home
            </NavLink>
            <NavLink className="text-white text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
              About
            </NavLink>
            <NavLink className="text-white text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
              Services
            </NavLink>
            <NavLink className="text-white text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
              Pricing
            </NavLink>
            <NavLink className="text-white text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
              Contact
            </NavLink>
          </div>
          {/* SignIn - SignUp  */}
          <div className="flex justify-between items-center space-x-5 px-5 py-2 border border-[#FE6B6E] rounded-full hover:shadow-md">
            <button
              type="button"
              onClick={() => {
                navigate(pathDefault.signUp);
              }}
            >
              <i className="fa-regular fa-pen-to-square text-white text-xl font-semibold hover:text-[#FE6B6E] duration-300" />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(pathDefault.signIn);
              }}
            >
              <i className="fa-regular fa-circle-user text-white text-xl font-semibold hover:text-[#FE6B6E] duration-300" />
            </button>
          </div>
        </div>
        {/* Video banner  */}
        <div className="h-[70vh] ">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/posterbanner.png"
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
          >
            <source src="/videobanner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute -bottom-1 w-full">
            <img className="w-full" src="/swoosh-hero.png" alt="" />
          </div>
        </div>
        {/* Title banner  */}
        <div className="absolute top-1/2 bottom-1/2 left-32 ">
          <div className="flex items-center gap-5">
            <img className="w-14" src="/airbnb_logo.svg" alt="" />
            <p className="text-8xl font-bold text-[#fe6b6e] pb-3">airbnb</p>
          </div>
          <h1 className="text-white text-2xl font-semibold">Belong anywhere</h1>
        </div>
      </header>
      {/* Search bar  */}
      <div className="mt-5">
        <SearchBar />
      </div>
      {/* Button bar  */}
      <div className="container my-5 flex justify-center items-center gap-5 ">
        <button className="px-3 py-2 border rounded-md hover:shadow-lg">
          Loại nơi ở
        </button>
        <button className="px-3 py-2 border rounded-md hover:shadow-lg">
          Giá
        </button>
        <button className="px-3 py-2 border rounded-md hover:shadow-lg">
          Đặt ngay
        </button>
        <button className="px-3 py-2 border rounded-md hover:shadow-lg">
          Phòng và phòng ngủ
        </button>
        <button className="px-3 py-2 border rounded-md hover:shadow-lg">
          Bộ lọc khác
        </button>
      </div>
    </div>
  );
};

export default HeaderTemplate;
