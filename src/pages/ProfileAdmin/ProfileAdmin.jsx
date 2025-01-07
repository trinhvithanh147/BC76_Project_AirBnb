import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { Button } from "antd";

const ProfileAdmin = () => {
  const { admin } = useSelector((state) => state.adminSlice);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate(pathDefault.adminLogin);
  };
  return (
    <div className="container mx-auto p-1 lg:p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg ">
        {/* Header */}
        <div className="flex items-center p-1 lg:p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white max-w-full rounded-lg">
          <img
            className="w-24 h-24 rounded-full border-4 border-white "
            alt="Profile"
            src={
              admin.avatar
                ? admin.avatar
                : admin.gender
                ? "/grilAdmin.png"
                : "/profileAdmin.png"
            }
          />
          <div className="ml-5">
            <h2 className="text-3xl font-bold">{admin.name}</h2>
            <p className="text-sm opacity-90">{admin.role}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 ">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Email</h4>
              <p className="text-gray-800">{admin.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Phone</h4>
              <p className="text-gray-800">{admin.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Role</h4>
              <p className="text-gray-800">{admin.role}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Birthday</h4>
              <p className="text-gray-800">{admin.birthday}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Gender</h4>
              <p className="text-gray-800">
                {admin.gender ? "Male" : "Female"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button
            className="px-6 py-2 bg-red-600 text-white rounded-lg transform hover:bg-red-700 hover:scale-110 hover:animate-pulse transition-all duration-300"
            onClick={handleLogOut}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
