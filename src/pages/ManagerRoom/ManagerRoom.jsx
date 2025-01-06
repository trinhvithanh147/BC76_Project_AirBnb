import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../components/InputCustome/InputCustome";
import { phongService } from "../../services/phong.service";
import FormUpdateRoom from "./components/FormUpdateRoom/FormUpdateRoom";
import FormViewDetail from "./components/FormViewDetail/FormViewDetail";
import FormAddComment from "../ManagerComments/components/FormAddComment/FormAddComment";
import FormAddRoom from "./components/FormAddRoom/FormAddRoom";
import { NotificationContext } from "../../App";

const ManagerRoom = () => {
  const [isModalUpdateRoom, setIsModalUpdateRoom] = useState(false);
  const [isModalAddRoom, setIsModalAddRoom] = useState(false);
  const [isModalOpenRoom, setIsModalOpenRoom] = useState(false);
  const [listphongThue, setListPhongThue] = useState([]);
  const [searchIDRoom, setsearchIDRoom] = useState([]);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [selectViewDetail, setSelectViewDetail] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const handleNotification = useContext(NotificationContext);
  const handleSearchIDRoom = (e) => {
    const value = e.target.value;
    setsearchIDRoom(value);
    if (value) {
      const filterList = listphongThue.filter((item) => {
        return item.id.toString().includes(value);
      });
      setFilteredRoom(filterList);
    } else {
      setFilteredRoom(listphongThue);
    }
  };
  const layListPhong = () => {
    phongService
      .phongThue()
      .then((res) => {
        console.log(res);
        setListPhongThue(res.data.content);
        setFilteredRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layListPhong();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Name",
      dataIndex: "tenPhong",
      key: "tenPhong",
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (value) => `${value} USD`,
    },
    {
      title: "Location ID",
      dataIndex: "maViTri",
      key: "maViTri",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (value, record, index) => <img src={value} alt="" width={100} />,
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
            <div className="b_eidt">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => {
                  setIsModalOpenRoom(true);
                  setSelectViewDetail(record);
                }}
              >
                View Details
              </Button>
            </div>
            <div className="b_delete">
              <Popconfirm
                placement="topLeft"
                title={"Are you sure you want to delete this user?"}
                description={"Delete a User"}
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  phongService
                    .xoaphongThue(record.id)
                    .then((res) => {
                      console.log(res);
                      handleNotification("success", res.data.message, 1500);
                      layListPhong();
                    })
                    .catch((err) => {
                      console.log(err);
                      handleNotification(
                        "error",
                        err.response.data.message,
                        1500
                      );
                    });
                }}
                onCancel={() => {}}
              >
                {" "}
                <Button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <div className="b_eidt">
              <Button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                onClick={() => {
                  setIsModalUpdateRoom(true);
                  setDataForm(record);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="min-h-screen ">
      <div className="bg-white p-6 space-y-5">
        <div className="flex space-x-5">
          <Button
            onClick={() => {
              setIsModalAddRoom(true);
            }}
          >
            Add New Room
          </Button>
          <div className="flex items-center gap-x-2">
            <InputCustome
              type="number"
              placeHolder={"Search for Room by ID"}
              handleChange={handleSearchIDRoom}
              value={searchIDRoom}
              className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
            />
          </div>
        </div>
        <Table
          dataSource={filteredRoom}
          columns={columns}
          className="border border-gray-300 rounded-lg"
          rowClassName="hover:bg-gray-100"
        />
      </div>
      <Modal
        title="View Details"
        open={isModalOpenRoom}
        footer={null}
        onCancel={() => {
          setIsModalOpenRoom(false);
        }}
      >
        <FormViewDetail selectViewDetail={selectViewDetail} />
      </Modal>
      <Modal
        title="Edit Profile"
        className=""
        open={isModalUpdateRoom}
        footer={null}
        onCancel={() => {
          setIsModalUpdateRoom(false);
        }}
      >
        <FormUpdateRoom
          dataForm={dataForm}
          handleCloseModal={() => {
            setIsModalUpdateRoom(false);
          }}
        />
      </Modal>
      <Modal
        title="Add New User"
        open={isModalAddRoom}
        footer={null}
        onCancel={() => {
          setIsModalAddRoom(false);
        }}
        layListPhong={layListPhong}
      >
        <FormAddRoom
          handleCloseModal={() => {
            setIsModalOpenRoom(false);
          }}
          layListPhong={layListPhong}
        />
      </Modal>
    </div>
  );
};

export default ManagerRoom;
