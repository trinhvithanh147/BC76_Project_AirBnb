import React from "react";
import { useState } from "react";

const GuestInput = () => {
  const [showGuestBox, setShowGuestBox] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);

  // Hàm tăng SL khách
  const incrementGuest = () => {
    setGuestCount((prevCount) => prevCount + 1);
  };

  // Hàm giảm SL khách
  const decrementGuest = () => {
    setGuestCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  // Hàm xác nhận và đóng bảng
  const handleConfirm = () => {
    setSelectedGuestCount(guestCount);
    setShowGuestBox(false); // Đóng DateRangePicker
  };
  return (
    <div className="relative">
      <div className="flex flex-col ">
        <label className="mb-1 text-md font-thin" htmlFor="">
          Khách
        </label>
        <input
          readOnly
          type="text"
          placeholder="Thêm khách"
          value={
            selectedGuestCount !== null ? `${selectedGuestCount} khách` : ""
          }
          onClick={() => {
            setShowGuestBox(true);
          }}
          className="w-full text-md font-semibold cursor-pointer focus:outline-none"
        />
      </div>

      {showGuestBox && (
        <div className="absolute top-full left-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="flex justify-between items-center gap-10  px-4 py-2">
            <label className="text-md" htmlFor="">
              Khách
            </label>
            <div className="flex justify-between items-center space-x-5">
              <button
                className="w-10 h-10 flex justify-center items-center border  rounded-full bg-[#FF385C] text-white font-bold"
                onClick={decrementGuest}
              >
                -
              </button>
              <span>{guestCount}</span>
              <button
                className="w-10 h-10 flex justify-center items-center border  rounded-full bg-[#FF385C] text-white font-bold"
                onClick={incrementGuest}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestInput;
{
  /* <label className="mb-1 text-md font-thin" htmlFor="">
        Khách
      </label>
      <input
        readOnly
        type="text"
        placeholder="Thêm khách"
        onClick={() => {
          setShowGuestBox(true);
        }}
        className="w-full text-md font-semibold cursor-pointer focus:outline-none"
        // value={`${} khách`}
      /> */
}
