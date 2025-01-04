import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { viTriService } from "../../../services/viTri.service";

const LocationItem = () => {
  const [listLocation, setListLocation] = useState([]);
  useEffect(() => {
    viTriService
      .getViTri()
      .then((res) => {
        console.log(res.data.content);
        setListLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      {listLocation.slice(0, 8).map((item, index) => {
        return (
          <div key={index} className="flex items-start gap-2">
            <div>
              <img className="w-20 h-20 rounded-lg" src={item.hinhAnh} alt="" />
            </div>
            <div>
              <p className="font-thin text-md">{item.tinhThanh}</p>
              <p>{item.quocGia}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LocationItem;
