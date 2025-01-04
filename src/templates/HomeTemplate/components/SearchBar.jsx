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
  const { setIdLocation, idLocation, setCheckIn, setCheckOut, setGuest } =
    useContext(AppContext);
  const navigate = useNavigate();
  console.log(idLocation);

  return (
    <div className="container">
      <div className="grid grid-cols-1 justify-center items-center gap-2 p-4 lg:grid lg:grid-cols-3  lg:mx-32 lg:px-10 py-3 border border-gray-400 md:rounded-full">
        <div className="md:place-self-center">
          <LocationInput setIdLocation={setIdLocation} />
        </div>
        <div className="md:place-self-center border-y-2 md:border-0 lg:border-l-2 lg:px-5">
          <StayInput setCheckIn={setCheckIn} setCheckOut={setCheckOut} />
        </div>
        <div className="md:place-self-center flex  items-center gap-10 lg:border-l-2 lg:pl-5">
          <GuestInput setGuest={setGuest} />
          <div className="">
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
    </div>
  );
};

export default SearchBar;
