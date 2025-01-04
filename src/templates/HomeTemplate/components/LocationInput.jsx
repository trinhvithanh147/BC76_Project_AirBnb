import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { viTriService } from "../../../services/viTri.service";

const LocationInput = ({ setIdLocation }) => {
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState("");

  const noneItem = {
    id: 0,
    image: "/non-skin.gif",
    label: "None",
    value: "",
  };
  useEffect(() => {
    viTriService
      .getViTri()
      .then((res) => {
        // console.log(res.data.content);
        setLocationList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleItemClick = (value) => {
    setLocation(value);
    setIsOpenBox(false);
  };

  return (
    <div className="relative w-80 ">
      <div
        onClick={() => {
          setIsOpenBox(true);
        }}
        className="flex flex-col cursor-pointer"
      >
        <label className="mb-1 text-md font-thin md:hidden lg:block">
          Địa điểm
        </label>
        <input
          readOnly
          type="text"
          placeholder="Bạn sắp đi đâu?"
          value={location}
          className="w-full text-md font-semibold focus:outline-none"
        />
      </div>
      {isOpenBox && (
        <div className="absolute top-full mt-2 w-full bg-white z-50 border border-gray-300 rounded-md shadow-lg">
          <div className="grid grid-cols-3 gap-3">
            <div
              key={noneItem.id}
              onClick={() => {
                handleItemClick(noneItem.value);
                setIdLocation(noneItem.value);
              }}
              className="flex flex-col justify-center items-center"
            >
              <img className="w-20 h-20" src={noneItem.image} alt="" />
              <span>{noneItem.label}</span>
            </div>
            {locationList.slice(0, 8).map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleItemClick(item.tinhThanh);
                    setIdLocation(item.id);
                  }}
                  className="flex flex-col justify-center items-center"
                >
                  <img className="w-20 h-20" src={item.hinhAnh} alt="" />
                  <span>{item.tinhThanh}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
