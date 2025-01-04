import { useContext, useEffect, useState } from "react";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { Avatar, Button, Input, Modal, Popconfirm, Table, Tag } from "antd";
import { NotificationContext } from "../../App";
import FormUpdateUser from "./components/FormUpdateUser/FormUpdateUser";
import InputCustome from "../../components/InputCustome/InputCustome";
import FormAddUser from "./components/FormAddUser/FormAddUser";

const ManagerUser = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredNguoiDung, setFilteredNguoiDung] = useState([]);
  const [formData, setFormData] = useState();
  const handleNotification = useContext(NotificationContext);

  const handleSearchID = (e) => {
    const value = e.target.value;
    setSearchID(value);
    if (value) {
      const filteredList = listNguoiDung.filter((item) => {
        return item.id.toString().includes(value);
      });
      setFilteredNguoiDung(filteredList);
    } else {
      setFilteredNguoiDung(listNguoiDung);
    }
  };
  const handleSearchName = (e) => {
    const value = e.target.value;
    setSearchName(value);
    if (value) {
      const filteredList = listNguoiDung.filter((item) => {
        return item.name.toString().includes(value);
      });
      setFilteredNguoiDung(filteredList);
    } else {
      setFilteredNguoiDung(listNguoiDung);
    }
  };
  useEffect(() => {
    nguoiDungService
      .timKiemTenNguoiDung(searchName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const layDanhSachNguoiDung = () => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setListNguoiDung(res.data.content);
        setFilteredNguoiDung(res.data.content);
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
          <span className="text-red-500 font-medium">
            Phone number not found
          </span>
        );
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "6",
      render: (value, record) => {
        return value ? (
          <Avatar src={value} className="w-8" />
        ) : record.role == "ADMIN" ? (
          record.gender == true ? (
            <Avatar src="/profileAdmin.png" className="w-8" />
          ) : (
            <Avatar src="/grilAdmin.png" className="w-8" />
          )
        ) : record.gender == true ? (
          <Avatar src="/userMan.png" className="w-8" />
        ) : (
          <Avatar src="/userGirl.png" className="w-8" />
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
            {value && "Invalid role"}
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
                  setIsModalUpdateOpen(true);
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
  return (
    listNguoiDung && (
      <div className="min-h-screen ">
        <div className="bg-white p-6 space-y-5">
          <div className="flex space-x-5">
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add New User
            </Button>
            <div className="flex items-center gap-x-2">
              <InputCustome
                type="number"
                placeHolder={"Searching for customer with ID"}
                handleChange={handleSearchID}
                value={searchID}
                className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
              />
              <span>or</span>
              <InputCustome
                type="text"
                placeHolder={"Searching for a customer by name"}
                handleChange={handleSearchName}
                value={searchName}
                className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
              />
              <span>(Choose one of the two)</span>
            </div>
          </div>
          <Table
            dataSource={filteredNguoiDung}
            columns={columns}
            className="border border-gray-300 rounded-lg"
            rowClassName="hover:bg-gray-100"
          />
        </div>

        <Modal
          title="Edit Profile"
          className=""
          open={isModalUpdateOpen}
          footer={null}
          onCancel={() => {
            setIsModalUpdateOpen(false);
          }}
        >
          <FormUpdateUser
            handleCloseModal={() => {
              setIsModalUpdateOpen(false);
            }}
            formData={formData}
            layDanhSachNguoiDung={layDanhSachNguoiDung}
          />
        </Modal>
        <Modal
          title="Add New User"
          open={isModalOpen}
          footer={null}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <FormAddUser
            handleCloseModal={() => {
              setIsModalOpen(false);
            }}
            layDanhSachNguoiDung={layDanhSachNguoiDung}
          />
        </Modal>
      </div>
    )
  );
};

export default ManagerUser;
