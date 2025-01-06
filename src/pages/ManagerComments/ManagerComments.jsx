import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../components/InputCustome/InputCustome";
import { Button, Modal, Popconfirm, Table, Tag } from "antd";
import { commentService } from "../../services/comment.service";
import FormUpdateComment from "./components/FormUpdateComment/FormUpdateComment";
import FormAddComment from "./components/FormAddComment/FormAddComment";
import { NotificationContext } from "../../App";

const ManagerComments = () => {
  const [searchIDComment, setsearchIDComment] = useState([]);
  const [filteredComment, setFilteredComment] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataForm, setDataForm] = useState([]);
  const handleNotification = useContext(NotificationContext);
  const handleSearchIDComment = (e) => {
    const value = e.target.value;
    setsearchIDComment(value);
    if (value) {
      const filterList = listBinhLuan.filter((item) => {
        return item.id.toString().includes(value);
      });
      setFilteredComment(filterList);
    } else {
      setFilteredComment(listBinhLuan);
    }
  };
  const [listBinhLuan, setListBinhLuan] = useState([]);
  const layListComment = () => {
    commentService
      .layDanhSachComment()
      .then((res) => {
        console.log(res);
        setListBinhLuan(res.data.content);
        setFilteredComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layListComment();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      className: "font-medium text-gray-700",
    },
    {
      title: "RoomID",
      dataIndex: "maPhong",
      key: "2",
      className: "text-left font-semibold text-gray-800",
    },
    {
      title: "userID",
      dataIndex: "maNguoiBinhLuan",
      key: "3",
    },
    {
      title: "Comment Date",
      dataIndex: "ngayBinhLuan",
      key: "4",
      className: "text-left text-blue-600",
    },
    {
      title: "Content Comment",
      dataIndex: "noiDung",
      key: "5",
    },
    {
      title: "Star rating",
      dataIndex: "saoBinhLuan",
      key: "6",
    },

    {
      title: "Action",
      key: "7",
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
                  commentService
                    .deleteComment(record.id)
                    .then((res) => {
                      console.log(res);
                      handleNotification("success", res.data.message, 1500);
                      layListComment();
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
              setIsModalAddOpen(true);
            }}
          >
            Add New Comment
          </Button>
          <div className="flex items-center gap-x-2">
            <InputCustome
              type="number"
              placeHolder={"Search Comment by ID"}
              handleChange={handleSearchIDComment}
              value={searchIDComment}
              className="border border-solid border-[#eff2ff] bg-white text-[#61748f] rounded-[0.3rem] min-w-[20rem] "
            />
          </div>
        </div>
        <Table
          dataSource={filteredComment}
          columns={columns}
          className="border border-gray-300 rounded-lg"
          rowClassName="hover:bg-gray-100"
        />
      </div>

      <Modal
        title="Edit Profile"
        open={isModalUpdateOpen}
        footer={null}
        onCancel={() => {
          setIsModalUpdateOpen(false);
        }}
      >
        <FormUpdateComment
          dataForm={dataForm}
          handleCloseModal={() => {
            setIsModalUpdateOpen(false);
          }}
          layListComment={layListComment}
        />
      </Modal>
      <Modal
        title="Add New User"
        open={isModalAddOpen}
        footer={null}
        onCancel={() => {
          setIsModalAddOpen(false);
        }}
      >
        <FormAddComment
          handleCloseModal={() => {
            setIsModalAddOpen(false);
          }}
          layListComment={layListComment}
        />
      </Modal>
    </div>
  );
};

export default ManagerComments;
