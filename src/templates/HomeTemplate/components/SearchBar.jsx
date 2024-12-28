import React from "react";
import LocationInput from "./LocationInput.jsx";
import StayInput from "./StayInput.jsx";
import GuestInput from "./GuestInput.jsx";
import Icon from "../../../components/Icon.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomList from "../../../pages/RoomList/RoomList.jsx";
import { pathDefault } from "../../../common/path.js";
import { useContext } from "react";
import { AppContext } from "../../../App.jsx";

const SearchBar = () => {
  // B6: Gọi kho chứa AppContext -  bóc tách dữ liệu trong kho chứa (B1-B5: App.jsx)
  const { setIdLocation, idLocation } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(idLocation);

  return (
    <div className="container">
      <div className="grid grid-cols-3  mx-32 px-10 py-3 border border-gray-400 rounded-full">
        <div className="">
          <LocationInput setIdLocation={setIdLocation} />
        </div>
        <div className="border-l-2 px-5">
          <StayInput />
        </div>
        <div className="flex justify-between items-center gap-10 border-l-2 pl-5">
          <GuestInput />
          <button
            onClick={() => {
              if (idLocation == "") return;
              navigate(`/room-list/${idLocation}`);
            }}
            className="flex justify-center items-center w-10 h-10 bg-red-500 rounded-full text-white"
          >
            <Icon.iconSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
