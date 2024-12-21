import {
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdBedroomChild } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import Icon from "../../components/Icon";
import { NavLink, Outlet } from "react-router-dom";
import { pathDefault } from "../../common/path";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {collapsed ? (
          <div className="flex justify-center py-4">
            <Icon.logoAdmin />{" "}
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
          items={[
            {
              key: "1",
              icon: <FaUser className="!text-[16px]"/>,
              label: 
              <NavLink to={pathDefault.managerUser}>
                <span>User</span> 
              </NavLink>
              ,
            },
            {
              key: "2",
              icon: <FaCalendarAlt className="!text-[16px]"/>,
              label:
              <NavLink to={pathDefault.managerReservation}>
                <span>Reservation</span>
              </NavLink> ,
            },
            {
              key: "3",
              icon: <BiSolidCommentDetail className="!text-[16px]"/>,
              label:
              <NavLink to={pathDefault.managerComments}>
                <span>Comments</span>
              </NavLink> ,
            },
            {
              key: "4",
              icon: <MdBedroomChild className="!text-[16px]"/>,
              label: 
              <NavLink to={pathDefault.managerRoom}>
                <span>Room</span>
              </NavLink> ,
            },
            {
              key: "5",
              icon: <FaLocationDot className="!text-[16px]"/>,
              label: 
              <NavLink to={pathDefault.managerLocation}>
                <span>Location</span>
              </NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="header_right">
              <div className="flex gap-4">
                <div className="notification">
                  <IoIosNotifications className="text-[20px] cursor-pointer"/>
                </div>
                <div className="email">
                  <IoIosMail className="text-[20px] cursor-pointer"/>
                </div>
                <div className="user">
                    <div className="avatar">

                    </div>
                    <div className="user-name">

                    </div>
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
