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
                <Button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <div className="b_eidt">
              <Button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
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
      <div className="p-6 space-y-5">
        <div className="flex space-x-5">
          <Button
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
        <Table
          dataSource={filteredRoomDaDat}
          columns={columns}
          className="border border-gray-300 rounded-lg"
          rowClassName="hover:bg-gray-100"
        />
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
    </>
  );
};

export default ManagerReservation;
