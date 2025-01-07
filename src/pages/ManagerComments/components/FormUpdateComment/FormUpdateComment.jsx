import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { Button, DatePicker, Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { commentService } from "../../../../services/comment.service";
import { NotificationContext } from "../../../../App";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import { phongService } from "../../../../services/phong.service";
const FormUpdateComment = ({ dataForm, handleCloseModal, layListComment }) => {
  const handleNotification = useContext(NotificationContext);
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [listMaPhong, setListMaPhong] = useState([]);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    values,
    setValues,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: 0,
      maPhong: 0,
      maNguoiBinhLuan: 0,
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: 0,
    },
    validationSchema: Yup.object({
      maPhong: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "Room code does not exist.", (value) =>
          listMaPhong.some((item) => item.id == value)
        ),
      maNguoiBinhLuan: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "User does not exist.", (value) =>
          listNguoiDung.some((item) => item.id == value)
        ),
      noiDung: Yup.string().required("Please do not leave it blank"),
      saoBinhLuan: Yup.number().required("Please do not leave it blank"),
      ngayBinhLuan: Yup.string()
        .required("Please do not leave it blank")
        .test(
          "is-future-date",
          "Birthday must be a date in the future",
          (value) => {
            if (!value) return false;
            const selectedDate = dayjs(value, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            const today = dayjs();
            return selectedDate.isBefore(today, "day");
          }
        ),
    }),
    onSubmit: (values) => {
      commentService
        .capNhatComment(values.id, values)
        .then((res) => {
          console.log(res);
          layListComment();
          handleNotification("success", res.data.message, 1500);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
      handleCloseModal();
      resetForm();
    },
  });
  useEffect(() => {
    if (dataForm) {
      console.log(dataForm);
      setValues({
        id: dataForm.id || 0,
        maPhong: dataForm.maPhong || 0,
        maNguoiBinhLuan: dataForm.maNguoiBinhLuan || 0,
        ngayBinhLuan: dataForm.ngayBinhLuan || 0,
        noiDung: dataForm.noiDung || "",
        saoBinhLuan: dataForm.saoBinhLuan || 0,
      });
    }
  }, [dataForm]);
  useEffect(() => {
    phongService
      .phongThue()
      .then((res) => {
        console.log(res);
        setListMaPhong(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setListNguoiDung(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <form action="" className="space-y-4" onSubmit={handleSubmit}>
      <InputCustome
        labelContent={"ID"}
        disable={true}
        name={"id"}
        value={values.id}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.id}
        touched={touched.id}
      />
      <InputCustome
        labelContent={"RoomID"}
        name={"maPhong"}
        value={values.maPhong}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.maPhong}
        touched={touched.maPhong}
      />
      <InputCustome
        labelContent={"userID"}
        name={"maNguoiBinhLuan"}
        value={values.maNguoiBinhLuan}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.maNguoiBinhLuan}
        touched={touched.maNguoiBinhLuan}
      />
      <div>
        <label htmlFor="">Comment Date</label>
        <DatePicker
          format={"YYYY-MM-DDTHH:mm:ss.SSSZ"}
          className="w-full"
          onBlur={handleBlur}
          onChange={(date, dateString) => [
            setFieldValue("ngayBinhLuan", dateString),
          ]}
          value={values.ngayBinhLuan ? dayjs(values.ngayBinhLuan) : null}
        />
        {touched.ngayBinhLuan && errors.ngayBinhLuan ? (
          <p className="text-red-500 mt-1">{errors.ngayBinhLuan}</p>
        ) : null}
      </div>
      <InputCustome
        labelContent={"Content Comment"}
        name={"noiDung"}
        value={values.noiDung}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.noiDung}
        touched={touched.noiDung}
      />
      <InputCustome
        labelContent={"Star rating"}
        name={"saoBinhLuan"}
        value={values.saoBinhLuan}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.saoBinhLuan}
        touched={touched.saoBinhLuan}
      />
      <Button
        htmlType="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
      >
        Submit
      </Button>
    </form>
  );
};

export default FormUpdateComment;
