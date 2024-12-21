import React from "react";
import { Button, Input } from "antd";
import { DatePicker } from "antd";
import { Dropdown } from "antd";
import { InputNumber } from "antd";
import "./searchBar.scss";
import Icon from "../../../components/Icon";
import InputSearch from "./InputSearch";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { viTriService } from "../../../services/viTri.service";
import { useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { pathDefault } from "../../../common/path";

const SearchBar = () => {
  const [listLocation, setListLocation] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [listSearch, setListSearch] = useState([]);

  // 1. Lấy DS Vị trí
  useEffect(() => {
    viTriService
      .getViTri()
      .then((res) => {
        console.log(res);
        setListLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 2. Lấy value input (dữ liệu keyword được nhập trên input)
  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };
  // 3. Function: lọc kết quả theo keyword
  function searchByKey(dataArray, searchValue) {
    // Chuyển đổi giá trị tìm kiếm thành chữ thường để so sánh không phân biệt chữ hoa chữ thường
    const lowerCaseSearchValue = searchValue.toLowerCase();
    // Lọc mảng dựa trên 'tinhThanh' hoặc 'tenViTri'
    return dataArray.filter((item) => {
      return (
        item.tinhThanh?.toLowerCase().includes(lowerCaseSearchValue) ||
        item.tenViTri?.toLowerCase().includes(lowerCaseSearchValue)
      );
    });
  }
  // 4. Chạy funtion trả về DS kết quả
  useEffect(() => {
    const data = searchByKey(listLocation, value);
    setListSearch(data);
  }, [value]);

  // 5. Render kết quả tìm kiếm lên Dropdown
  const itemListLocation = useMemo(() => {
    return listSearch.slice(0, 5).map((item, index) => {
      return {
        key: item.id,
        label: (
          <Link to={"/"} className="flex items-center space-x-4">
            <img className=" w-10 h-10" src={item.hinhAnh} alt="" />
            <div>
              <h4>{`${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`}</h4>
            </div>
          </Link>
        ),
      };
    });
  }, [listSearch]);
  // Function: Ẩn hiện Dropdown input Tìm kiếm địa điểm
  const handelClickInputSearch = () => {
    setOpenDropdown(true);
  };

  // Function: input DatePicker
  const inputDatePickerOnChange = (date, dateString) => {
    console.log(date, dateString);
  };
  // Function: input Số lượng khách
  const inputNumberOnChange = (value) => {
    console.log("changed", value);
  };
  // Dropdown Menu Số lượng khách
  const items = [
    {
      key: "0",
      label: (
        <div
          className="flex justify-between items-center gap-5"
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click tắt dropdown
        >
          <div>
            <h1>Người lớn</h1>
            <p>Từ 13 tuổi trở lên</p>
          </div>
          <div>
            <InputNumber
              min={1}
              max={7}
              defaultValue={0}
              onChange={inputNumberOnChange}
            />
          </div>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div
          className="flex justify-between items-center gap-5"
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click tắt dropdown
        >
          <div>
            <h1>Trẻ em</h1>
            <p>Độ tuổi 2 - 12</p>
          </div>
          <div>
            <InputNumber
              min={1}
              max={7}
              defaultValue={0}
              onChange={inputNumberOnChange}
            />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex justify-between items-center gap-5"
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click tắt dropdown
        >
          <div>
            <h1>Em bé</h1>
            <p>Dưới 2 tuổi</p>
          </div>
          <div>
            <InputNumber
              min={1}
              max={5}
              defaultValue={0}
              onChange={inputNumberOnChange}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-between items-start gap-5 py-3 px-7 border border-[#BFBFBF] rounded-full">
      <Dropdown
        open={openDropdown}
        menu={{
          items: itemListLocation,
          onMouseLeave: () => {
            setOpenDropdown(false);
          },
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="">Địa điểm</label>
          <InputSearch
            placeholder="Tìm kiếm địa điểm"
            handelClickInputSearch={handelClickInputSearch}
            handelChangeKeyword={handleChangeKeyword}
            value={keyword}
          />
        </div>
      </Dropdown>

      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Nhận phòng</label>
          <DatePicker
            placeholder="Thêm ngày"
            onChange={inputDatePickerOnChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Trả phòng</label>
          <DatePicker
            placeholder="Thêm ngày"
            onChange={inputDatePickerOnChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-col ">
          <label htmlFor="">Số lượng khách</label>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a
              className="text-[#BFBFBF] text-[14px]"
              onClick={(e) => e.preventDefault()}
            >
              Thêm Khách
            </a>
          </Dropdown>
        </div>

        <button className="bg-[#E31D5C] text-white p-4 rounded-full">
          <Icon.iconSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
