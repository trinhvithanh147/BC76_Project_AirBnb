import React, { useContext, useEffect, useState } from "react";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { Avatar, Button, Modal, Popconfirm, Table, Tag } from "antd";
import { NotificationContext } from "../../App";
const ManagerUser = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const handleNotification = useContext(NotificationContext);
  const layDanhSachNguoiDung = () => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setListNguoiDung(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layDanhSachNguoiDung();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      className: "font-medium text-gray-700",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      className: "text-left font-semibold text-gray-800",
    },
    {
      title: "Date of Birth",
      dataIndex: "birthday",
      key: "3",
      className: "text-left font-semibold text-gray-800",
      render: (value, record, index) => {
        return value ? value : "Not Available";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "4",
      className: "text-left text-blue-600",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "5",
      render: (value) => {
        return value ? (
          <span className="text-green-500 font-medium">{value}</span>
        ) : (
          <span className="text-red-500 font-medium">Undefined</span>
        );
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "6",
      render: (value, record) => {
        return value ? (
          <img
            src={value}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-blue-300 shadow-sm"
          />
        ) : (
          <Avatar
            size={48}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold"
          >
            {record.name[0].toUpperCase()}
          </Avatar>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "7",
      render: (value) => {
        return value === "ADMIN" ? (
          <Tag className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full font-medium">
            {value}
          </Tag>
        ) : value === "USER" ? (
          <Tag className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 rounded-full font-medium">
            {value}
          </Tag>
        ) : (
          <Tag className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full font-medium">
            {value || "Undefined"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "8",
      render: (value, record, index) => {
        if (record.role == "ADMIN") {
          return <span>No actions allowed</span>;
        }
        return (
          <div className="flex gap-2">
            <div className="b_delete">
              <Popconfirm
                placement="topLeft"
                title={"Are you sure you want to delete this user?"}
                description={"Delete a User"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  nguoiDungService
                    .xoaNguoiDung(record.id)
                    .then((res) => {
                      console.log(res);
                      layDanhSachNguoiDung();
                      handleNotification("success", res.data.message);
                    })
                    .catch((err) => {
                      handleNotification("error", err.response.data.message);
                    });
                }}
                onCancel={() => {}}
              >
                {" "}
                <Button>Delete User</Button>
              </Popconfirm>
            </div>
            <div className="b_eidt">
              <Button
                onClick={() => {
                  setFormData(record);
                  setIsModalOpen(true);
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  console.log(formData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Manager User
      </h1>
      <div className="bg-white shadow-xl rounded-lg p-6">
        <Table
          dataSource={listNguoiDung}
          columns={columns}
          className="border border-gray-300 rounded-lg"
          rowClassName="hover:bg-gray-100"
        />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ManagerUser;
