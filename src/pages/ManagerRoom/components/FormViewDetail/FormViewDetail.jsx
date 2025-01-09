import React from "react";

const FormViewDetail = ({ selectViewDetail }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-extrabold text-blue-600">Chi tiết phòng</h2>

      {selectViewDetail.moTa && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Mô tả:</span>{" "}
          {selectViewDetail.moTa}
        </div>
      )}

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Bàn là:</span>{" "}
        {selectViewDetail.banLa ? "Có" : "Không"}
      </div>

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Bàn ủi:</span>{" "}
        {selectViewDetail.banUi ? "Có" : "Không"}
      </div>

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Bếp:</span>{" "}
        {selectViewDetail.bep ? "Có" : "Không"}
      </div>

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Điều hòa:</span>{" "}
        {selectViewDetail.dieuHoa ? "Có" : "Không"}
      </div>

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Đỗ xe:</span>{" "}
        {selectViewDetail.doXe ? "Có" : "Không"}
      </div>

      {selectViewDetail.giaTien && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Giá tiền:</span>{" "}
          {selectViewDetail.giaTien}
        </div>
      )}

      {selectViewDetail.giuong && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Giường:</span>{" "}
          {selectViewDetail.giuong}
        </div>
      )}

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Hồ bơi:</span>{" "}
        {selectViewDetail.hoBoi ? "Có" : "Không"}
      </div>

      {selectViewDetail.khach && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Khách:</span>{" "}
          {selectViewDetail.khach}
        </div>
      )}

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Máy giặt:</span>{" "}
        {selectViewDetail.mayGiat ? "Có" : "Không"}
      </div>

      {selectViewDetail.phongNgu && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Phòng ngủ:</span>{" "}
          {selectViewDetail.phongNgu}
        </div>
      )}

      {selectViewDetail.phongTam && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Phòng tắm:</span>{" "}
          {selectViewDetail.phongTam}
        </div>
      )}

      {selectViewDetail.tenPhong && (
        <div className="text-gray-700">
          <span className="font-bold uppercase text-blue-500">Tên phòng:</span>{" "}
          {selectViewDetail.tenPhong}
        </div>
      )}

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Ti vi:</span>{" "}
        {selectViewDetail.tivi ? "Có" : "Không"}
      </div>

      <div className="text-gray-700">
        <span className="font-bold uppercase text-blue-500">Wifi:</span>{" "}
        {selectViewDetail.wifi ? "Có" : "Không"}
      </div>
    </div>
  );
};

export default FormViewDetail;
