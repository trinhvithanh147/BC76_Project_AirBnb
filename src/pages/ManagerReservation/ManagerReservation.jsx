import { Button, Input, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { datPhongService } from "../../services/datPhong.service";
import FormUpdateReservation from "./components/FormUpdateReservation/FormUpdateReservation";
import InputCustome from "../../components/InputCustome/InputCustome";
import FormAddReservation from "./components/FormAddReservation/FormAddReservation";

const ManagerReservation = () => {
  const [listDatPhong, setListDatPhong] = useState([]);
  const [isModalNewReservation, setIsModalNewReservation] = useState(false);
  const [listRoomDaDat, setListRoomDaDat] = useState();
  const [filteredRoomDaDat, setFilteredRoomDaDat] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isModalDatPhongOpen, setIsModalDatPhongOpen] = useState(false);
  const handleSearchIDRoom = (e) => {
    const value = e.target.value;
    setListRoomDaDat(value);
    if (value) {
      const filterList = listDatPhong.filter((item) => {
        return item.id.toString().includes(value);
      });
      setFilteredRoomDaDat(filterList);
    } else {
      setFilteredRoomDaDat(listDatPhong);
    }
  };
  const layListDatPhongService = () => {
    datPhongService
      .datPhong()
      .then((res) => {
        console.log(res);
        setListDatPhong(res.data.content);
        setFilteredRoomDaDat(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layListDatPhongService();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: 0,
    },
    {
      title: "userID",
      dataIndex: "maNguoiDung",
      key: 1,
    },
    {
      title: "roomID",
      dataIndex: "maPhong",
      key: 2,
    },
    {
      title: "checkInDate",
      dataIndex: "ngayDen",
      key: 3,
    },
    {
      title: "checkOutDate",
      dataIndex: "ngayDi",
      key: 4,
    },
    {
      title: "guestCount",
      dataIndex: "soLuongKhach",
      key: 5,
    },
    {
      title: "Action",
      key: 5,
      render: (value, record, index) => {
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
                  datPhongService
                    .xoaDatPhong(record.id)
                    .then((res) => {
                      layListDatPhongService();
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
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
                  setIsModalDatPhongOpen(true);
                  setFormData(record);
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
    <>
      <div className="min-h-screen overflow-x-scroll lg:overflow-hidden">
        <div className="p-6 space-y-5 ">
          <div className="flex space-x-5">
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              onClick={() => {
                setIsModalNewReservation(true);
              }}
            >
              Add New Room
            </Button>
            <div className="flex items-center gap-x-2">
              <InputCustome
                type="number"
                placeHolder={"Search Reservation by ID"}
                className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
                handleChange={handleSearchIDRoom}
                value={listRoomDaDat}
              />
            </div>
          </div>
          <Table dataSource={filteredRoomDaDat} columns={columns} />
        </div>
        <Modal
          title="Booking"
          open={isModalDatPhongOpen}
          footer={null}
          onCancel={() => {
            setIsModalDatPhongOpen(false);
          }}
        >
          <FormUpdateReservation
            layListDatPhongService={layListDatPhongService}
            formData={formData}
            handleCloseModal={() => {
              setIsModalDatPhongOpen(false);
            }}
          />
        </Modal>
        <Modal
          title="Add New Reservation"
          open={isModalNewReservation}
          footer={null}
          onCancel={() => {
            setIsModalNewReservation(false);
          }}
        >
          <FormAddReservation
            handleCloseModal={() => {
              setIsModalNewReservation(false);
            }}
            layListDatPhongService={layListDatPhongService}
          />
        </Modal>
      </div>
    </>
  );
};

export default ManagerReservation;
