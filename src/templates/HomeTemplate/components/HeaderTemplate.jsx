import React from "react";
import Icon from "../../../components/Icon";
import { NavLink } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import "./headerTemplate.scss";
import SearchBar from "./SearchBar";
const HeaderTemplate = () => {
  return (
    <header className="py-5 border-b">
      <div className="container flex justify-between items-center">
        <div>
          <Icon.logoHeader />
        </div>

        <div>
          <SearchBar />
        </div>

        <div className="flex justify-end items-center gap-5">
          <NavLink
            to={pathDefault.homePage}
            className="px-3 py-2 rounded-full hover:shadow-md hover:bg-[#F7F7F7]"
          >
            Cho thuê chỗ ở qua Airbnb
          </NavLink>
          <button className="p-2 rounded-full hover:shadow-md hover:bg-[#F7F7F7]">
            <Icon.iconGlobal />
          </button>

          <button className="px-3 py-2 border border-[#B0B0B0] rounded-full hover:shadow-xl">
            <div className="flex justify-between items-center gap-3 ">
              <div>
                <Icon.iconBar />
              </div>
              <div>
                <Icon.iconUser />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
