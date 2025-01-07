import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../components/InputCustome/InputCustome";
import FormUpdateLocation from "./components/FormUpdateLocation/FormUpdateLocation";
import FormAddLocation from "./components/FormAddLocation/FormAddLocation";
import { NotificationContext } from "../../App";
import { viTriService } from "../../services/viTri.service";

const ManagerLocation = () => {
  const [isModalAddLocation, setIsModalAddLocation] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [listBinhLuan, setListBinhLuan] = useState([]);
  const [searchIDLocation, setsearchIDLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  const handleNotification = useContext(NotificationContext);
  const handleSearchIDLocation = (e) => {
    const value = e.target.value;
    setsearchIDLocation(value);
    if (value) {
      const filterList = listBinhLuan.filter((item) => {
        return item.id.toString().includes(value);
      });
      setFilteredLocation(filterList);
    } else {
      setFilteredLocation(listBinhLuan);
    }
  };
  const layListViTri = () => {
    vitriService
      .vitri()
      .then((res) => {
        console.log(res);
        setListBinhLuan(res.data.content);
        setFilteredLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layListViTri();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      className: "font-medium text-gray-700",
    },
    {
      title: "Location Name",
      dataIndex: "tenViTri",
      key: "2",
      className: "text-left font-semibold text-gray-800",
    },
    {
      title: "City/Province",
      dataIndex: "tinhThanh",
      key: "3",
    },
    {
      title: "Country",
      dataIndex: "quocGia",
      key: "4",
      className: "text-left text-blue-600",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "5",
      render: (value, record, index) => {
        return <img src={value} alt="" width={100} />;
      },
    },

    {
      title: "Action",
      key: "6",
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
                  viTriService
                    .xoaViTri(record.id)
                    .then((res) => {
                      console.log(res);
                      handleNotification("success", res.data.message, 1500);
                      layListViTri();
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
                <Button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300">
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <div className="b_eidt">
              <Button
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300"
                onClick={() => {
                  setIsModalUpdateOpen(true);
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
    <div className="min-h-screen overflow-x-scroll lg:overflow-hidden">
      <div className="bg-white p-6 space-y-5">
        <div className="flex space-x-5">
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            onClick={() => {
              setIsModalAddLocation(true);
            }}
          >
            Add New Location
          </Button>
          <div className="flex items-center gap-x-2">
            <InputCustome
              type="number"
              placeHolder={"Search Location by ID"}
              handleChange={handleSearchIDLocation}
              value={searchIDLocation}
              className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
            />
          </div>
        </div>
        <Table dataSource={filteredLocation} columns={columns} />
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
        <FormUpdateLocation
          dataForm={dataForm}
          handleCloseModal={() => {
            setIsModalUpdateOpen(false);
          }}
          layListViTri={layListViTri}
        />
      </Modal>
      <Modal
        title="Add New Location"
        open={isModalAddLocation}
        footer={null}
        onCancel={() => {
          setIsModalAddLocation(false);
        }}
      >
        <FormAddLocation
          handleCloseModal={() => {
            setIsModalAddLocation(false);
          }}
          layListViTri={layListViTri}
        />
      </Modal>
    </div>
  );
};

export default ManagerLocation;
