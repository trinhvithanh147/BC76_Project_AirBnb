import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";

const FooterTemplate = () => {
  const titleList = [
    {
      title: "Hỗ trợ",
      children: [
        {
          title: "Trung tâm trợ giúp",
        },
        {
          title: "AirCover",
        },
        {
          title: "Chống phân biệt đối xử",
        },
        {
          title: "Hỗ trợ người khuyết tật",
        },
        {
          title: "Các tùy chọn hủy",
        },
        {
          title: "Báo cáo lo ngại của khu dân cư",
        },
      ],
    },
    {
      title: "Đón tiếp khách",
      children: [
        {
          title: "Cho thuê nhà trên Airbnb",
        },
        {
          title: "AirCover cho Chủ nhà",
        },
        {
          title: "Tài nguyên về đón tiếp khách",
        },
        {
          title: "Diễn đàn cộng đồng",
        },
        {
          title: "Đón tiếp khách có trách nhiệm",
        },
        {
          title: "Tham gia khóa học miễn phí về công việc Đón tiếp khách",
        },
        {
          title: "Tìm đồng chủ nhà",
        },
      ],
    },
    {
      title: "Airbnb",
      children: [
        {
          title: "Trang tin tức",
        },
        {
          title: "Tính năng mới",
        },
        {
          title: "Cơ hội nghề nghiệp",
        },
        {
          title: "Nhà đầu tư",
        },
        {
          title: "Chỗ ở khẩn cấp Airbnb.org",
        },
      ],
    },
  ];
  return (
    <footer className="pt-10  bg-[#F7F7F7]">
      <div className="container grid grid-cols-3 border-b-2">
        {titleList.map((item, index) => {
          return (
            <ul className="space-y-5" key={index}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.children.map((child, i) => {
                return (
                  <li key={i}>
                    <Link className="font-thin hover:text-[#FF385C]">
                      {child.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className="container py-5 flex justify-between items-center">
        {/* left  */}
        <div className="flex">
          <p>© 2024 Airbnb, Inc.</p>
          <ul className="flex">
            <li>
              <Link>· Quyền riêng tư</Link>
            </li>
            <li>
              <Link>· Điều khoản</Link>
            </li>
            <li>
              <Link>· Sơ đồ trang web</Link>
            </li>
          </ul>
        </div>
        {/* right  */}
        <div className="flex justify-between items-center space-x-5">
          <div className="flex justify-between items-center space-x-5 ">
            <button className="flex justify-between items-center space-x-1">
              <span>
                <Icon.iconGlobal />
              </span>
              <span className="hover:underline">Tiếng Việt (VN)</span>
            </button>
            <button className="flex justify-between items-center space-x-1">
              <span>₫</span>
              <span className="hover:underline">VND</span>
            </button>
          </div>
          <div className="flex justify-between items-center space-x-3">
            <Link>
              <Icon.iconFacebook />
            </Link>
            <Link>
              <Icon.iconTwitter />
            </Link>
            <Link>
              <Icon.iconInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTemplate;
