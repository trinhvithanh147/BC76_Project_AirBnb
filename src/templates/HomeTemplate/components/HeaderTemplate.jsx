import React from "react";
import Icon from "../../../components/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import "./headerTemplate.scss";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleDeleteUserInfo } from "../../../redux/slice/user.slice";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaPenToSquare } from "react-icons/fa6";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { MdCreditCard } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdFolderOpen } from "react-icons/md";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
const HeaderTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useSelector((state) => state.userInfo.user);
  console.log(user);

  return (
    <div className="">
      <header className="relative py-5 border-none flex flex-col ">
        {/* Header bar  */}
        <div className="container flex justify-between items-center ">
          {/* Logo  */}
          <NavLink to={pathDefault.homePage}>
            <Icon.logoHeader />
          </NavLink>
          {/* Navbar  */}
          <div className="hidden md:flex justify-between items-center space-x-10">
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
          {user ? (
            // CÓ TÀI KHOẢN
            <div className="flex gap-2 items-center">
              {/* Mobile */}
              <div className="block bg-white px-3 py-2 rounded-xl md:hidden">
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: (
                          <div className="flex flex-col bg-white w-40 px-4 py-2 ">
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
                            <NavLink className="text-black text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
                              About
                            </NavLink>
                            <NavLink className="text-black text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
                              Services
                            </NavLink>
                            <NavLink className="text-black text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
                              Pricing
                            </NavLink>
                            <NavLink className="text-black text-xl font-semibold hover:text-[#FE6B6E] hover:duration-300">
                              Contact
                            </NavLink>
                          </div>
                        ),
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <FaBars />
                  </a>
                </Dropdown>
              </div>
              {/* Tablet - Laptop  */}
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <div className="flex flex-col w-80 ">
                          <div className="bg-red-300 py-8 px-10 text-center relative">
                            <h1 className="font-bold">{user.name}</h1>
                            <div className="absolute left-1/2 -translate-x-1/2  w-14 h-14 p-1 bg-white rounded-full">
                              <img
                                className="rounded-full"
                                src={user.avatar}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="pb-2">
                            <div className="pt-10">
                              <div className="text-center">
                                <h1>
                                  Xin chào{" "}
                                  <span className="font-bold">{user.name}</span>
                                </h1>
                                <p>{user.email}</p>
                                <div className="flex justify-center items-center space-x-3 mt-2">
                                  <div className="flex items-center justify-center p-2   bg-red-300 rounded-full">
                                    <IoKeyOutline
                                      size={20}
                                      className="font-semibold"
                                    />
                                  </div>
                                  <div className="flex items-center justify-center p-2   bg-red-300 rounded-full">
                                    <MdCreditCard
                                      size={20}
                                      className="font-semibold"
                                    />
                                  </div>
                                  <div className="flex items-center justify-center p-2   bg-red-300 rounded-full">
                                    <MdOutlineLocationOn
                                      size={20}
                                      className="font-semibold"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Link
                              className="flex items-center space-x-2 hover:bg-gray-200 py-2 px-4 hover:text-current "
                              to={"/"}
                            >
                              <MdFolderOpen />
                              <span>Quản lý tài khoản</span>
                            </Link>
                            <Link
                              className="flex items-center space-x-2 hover:bg-gray-200 py-2 px-4 hover:text-current "
                              to={"/"}
                            >
                              <AiOutlineUserSwitch />
                              <span>Đổi tài khoản</span>
                            </Link>
                            <div
                              onClick={() => {
                                dispatch(handleDeleteUserInfo());
                                localStorage.removeItem("userInfo");
                              }}
                              className="flex items-center space-x-2 hover:bg-gray-200 py-2 px-4 hover:text-current"
                            >
                              <IoMdLogIn />
                              <span>Đăng xuất</span>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <button
                    onClick={() => {
                      setOpenDropdown(!openDropdown);
                    }}
                    className="p-1 bg-white rounded-full  relative"
                  >
                    <img
                      src={user.avatar || "/default_avatar.jpg"}
                      className="w-8 h-8 rounded-full"
                      alt={user.name}
                    />
                  </button>
                </a>
              </Dropdown>
            </div>
          ) : (
            // CHƯA CÓ TÀI KHOẢN
            <div className="flex gap-2 items-center">
              {/* Mobile */}
              <div className="block bg-white px-3 py-2 rounded-xl md:hidden">
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: (
                          <div className="flex flex-col bg-black p-4 ">
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
                        ),
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <FaBars />
                  </a>
                </Dropdown>
              </div>
              {/* Tablet - Laptop  */}
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <div className="py-4 flex flex-col">
                          <Link
                            className="flex items-center space-x-2 hover:bg-gray-200 py-2 px-4"
                            to={pathDefault.signIn}
                          >
                            <IoMdLogIn />
                            <span>Đăng nhập</span>
                          </Link>
                          <Link
                            className="flex items-center space-x-2 hover:bg-gray-200 py-2 px-4"
                            to={pathDefault.signUp}
                          >
                            <FaPenToSquare />
                            <span>Đăng ký</span>
                          </Link>
                        </div>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <button
                    onClick={() => {
                      setOpenDropdown(!openDropdown);
                    }}
                    className="bg-white p-3 rounded-full relative"
                  >
                    <FaUser fill="#FE6B6E" />
                  </button>
                </a>
              </Dropdown>
            </div>
          )}
        </div>
        {/* Video banner  */}
        <div className="h-[40vh] md-[60vh] lg:h-[70vh] ">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-60 ">
          <div className="flex justify-center items-center gap-2 lg:gap-5">
            <img className="w-8 md:w-14" src="/airbnb_logo.svg" alt="" />
            <p className="font-bold text-[#fe6b6e] text-3xl md:text-8xl md:pb-3">
              airbnb
            </p>
          </div>
          <h1 className="text-white font-semibold text-xl md:text-2xl">
            Belong anywhere
          </h1>
        </div>
      </header>
      {/* Search bar  */}
      <div className="mt-5">
        <SearchBar />
      </div>
      {/* Button bar  */}
      <div className="container my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-5 ">
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

{
  /* <img
src={user.avatar || "/default_avatar.jpg"}
className="w-8 h-8 rounded-full"
alt={user.name}
/> */
}

{
  /* <div className="flex justify-between items-center space-x-5 px-5 py-2 border border-[#FE6B6E] rounded-full hover:shadow-md">
            {user ? (
              <>
               
              </>
            ) : (
              <>
                {" "}
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
              </>
            )}
          </div>
             */
}
