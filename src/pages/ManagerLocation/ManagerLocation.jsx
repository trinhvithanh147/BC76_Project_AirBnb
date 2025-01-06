import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { vitriService } from "../../services/vitri.service";
import InputCustome from "../../components/InputCustome/InputCustome";
import FormUpdateLocation from "./components/FormUpdateLocation/FormUpdateLocation";
import FormAddLocation from "./components/FormAddLocation/FormAddLocation";
import { NotificationContext } from "../../App";

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
                  vitriService
                    .xoaviTri(record.id)
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
                <Button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <div className="b_eidt">
              <Button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
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
    <div className="min-h-screen ">
      <div className="bg-white p-6 space-y-5">
        <div className="flex space-x-5">
          <Button
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
        <Table
          dataSource={filteredLocation}
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
        <FormUpdateLocation
          dataForm={dataForm}
          handleCloseModal={() => {
            setIsModalUpdateOpen(false);
          }}
          layListViTri={layListViTri}
        />
      </Modal>
      <Modal
        title="Add New User"
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
