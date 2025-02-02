import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdBedroomChild } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { pathDefault } from "../../common/path";
import Icon from "../../components/Icon";
import "./adminTemplate.scss";

const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const { admin } = useSelector((state) => state.adminSlice);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(admin);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Gọi ngay khi component mount để thiết lập trạng thái ban đầu
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const dataString = localStorage.getItem("userInfo");

    if (!dataString) {
      window.location.href = pathDefault.adminLogin;
    } else {
      const data = JSON.parse(dataString);
      if (data.user.role !== "ADMIN") {
        window.location.href = pathDefault.homePage;
      }
    }
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate(pathDefault.adminLogin);
  };

  const item = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 flex flex-col"
        >
          <span className="block text-center text-[#212b37] text-[0.85rem] font-normal poppins-regular">
            Hello {admin.name && admin.name}{" "}
          </span>
          <span className="text-[#6e829f] text-[0.75rem] text-center">
            UI/UX Designer
          </span>
        </a>
      ),
      key: "0",
    },

    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center pl-6 py-2"
          onClick={() => {
            handleLogOut();
          }}
        >
          <IoLockClosedOutline className=" bg-primary-transparent rounded-[50%] text-primary-transparent mr-2 leading-[1.1]" />
          <span className="text-[#212b37] font-normal text-[0.85rem] block">
            Log out
          </span>
        </a>
      ),
      key: "1",
    },
  ];
  const itemLanguage = [
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img
                src="/us_flag.jpg"
                alt=""
                className="w-full h-full rounded-[50%]"
              />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              English
            </span>
          </div>
        </>
      ),
      key: "0",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/spain_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              español{" "}
            </span>
          </div>
        </>
      ),
      key: "1",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/french_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              français{" "}
            </span>
          </div>
        </>
      ),
      key: "2",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/uae_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              عربي{" "}
            </span>
          </div>
        </>
      ),
      key: "3",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/germany_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              Deutsch{" "}
            </span>
          </div>
        </>
      ),
      key: "4",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/china_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              中国人{" "}
            </span>
          </div>
        </>
      ),
      key: "5",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/italy_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              Italiano{" "}
            </span>
          </div>
        </>
      ),
      key: "6",
    },
    {
      label: (
        <>
          <div className="flex items-center p-3">
            <span className="w-[1.25rem] h-[1.25rem] mr-2">
              <img src="/russia_flag.jpg" alt="" />
            </span>
            <span className="text-[0.85rem] font-normal text-[#212b37]">
              {" "}
              Русский{" "}
            </span>
          </div>
        </>
      ),
      key: "7",
    },
  ];

  return (
    <Layout className="min-h-screen layoutAdmin overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {collapsed ? (
          <div className="flex justify-center py-4">
            <NavLink to={pathDefault.homePage}>
              <Icon.logoAdmin />{" "}
            </NavLink>
          </div>
        ) : (
          <div className="admin-logo flex justify-center py-4">
            <NavLink to={pathDefault.homePage}>
              <Icon.logoHeader />
            </NavLink>
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="text-white "
          items={[
            {
              key: "1",
              icon: <FaUser className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.managerUser}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>User</span>
                </NavLink>
              ),
            },
            {
              key: "2",
              icon: <FaCalendarAlt className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.managerReservation}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>Reservation</span>
                </NavLink>
              ),
            },
            {
              key: "3",
              icon: <BiSolidCommentDetail className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.managerComments}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>Comments</span>
                </NavLink>
              ),
            },
            {
              key: "4",
              icon: <MdBedroomChild className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.managerRoom}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>Room</span>
                </NavLink>
              ),
            },
            {
              key: "5",
              icon: <FaLocationDot className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.managerLocation}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>Location</span>
                </NavLink>
              ),
            },
            {
              key: "6",
              icon: <CgProfile className="!text-[16px]" />,
              label: (
                <NavLink
                  to={pathDefault.profileAdmin}
                  className={({ isActive, isPending }) => {
                    return `px-3 rounded-md w-full block ${
                      isActive ||
                      location.pathname == "/admin" ||
                      location.pathname == "/admin/"
                        ? "item-active"
                        : ""
                    }`;
                  }}
                >
                  <span>Profile</span>
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex lg:justify-between md:justify-between justify-end items-center px-4 pt-3 lg:pt-0 md:pt-0 lg:p-0">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
              className="lg:block hidden md:block"
            />
            <div className="header_right">
              <div className="flex gap-4 items-center">
                <div className="language block">
                  <Dropdown
                    menu={{
                      items: itemLanguage,
                    }}
                    trigger={["click"]}
                    className="flex items-center"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Icon.languageAdmin className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                    </a>
                  </Dropdown>
                </div>
                <div className="darkscreen lg:block hidden ">
                  <Icon.darkscreen className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                </div>
                <div className="notification ">
                  <Icon.notificationAdmin className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                </div>
                <div className="email ">
                  <Icon.categoryAdmin className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                </div>
                <div className="full-screen lg:block hidden">
                  <Icon.fullscreen className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                </div>
                <div className="user w-full">
                  <Dropdown
                    className="flex"
                    menu={{
                      items: item,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      {admin.avatar && admin.avatar ? (
                        <Avatar
                          src={admin.avatar}
                          className="w-[2rem] h-[2rem] rounded-[0.3rem] "
                        />
                      ) : admin.role == "ADMIN" && admin.gender == true ? (
                        <Avatar
                          src="/grilAdmin.png"
                          className="w-[2rem] h-[2rem] rounded-[0.3rem]"
                        />
                      ) : (
                        <Avatar
                          src="/profileAdmin.png"
                          className="w-[2rem] h-[2rem] rounded-[0.3rem]"
                        />
                      )}
                    </a>
                  </Dropdown>
                </div>
                <div className="full-screen">
                  <Icon.settingAdmin className="border border-sold border-[#e2e6f1] font-[1rem] p-[0.4rem] w-[2rem] h-[2rem] rounded-[0.3rem] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
