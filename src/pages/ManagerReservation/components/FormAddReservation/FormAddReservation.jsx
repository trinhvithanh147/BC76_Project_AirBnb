import { Button, DatePicker } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { useFormik } from "formik";
import { datPhongService } from "../../../../services/datPhong.service";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import * as Yup from "yup";
import { phongService } from "../../../../services/phong.service";
import { NotificationContext } from "../../../../App";
import dayjs from "dayjs";
const FormAddReservation = ({ handleCloseModal, layListDatPhongService }) => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [listMaPhong, setListMaPhong] = useState([]);
  const handleNotification = useContext(NotificationContext);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      id: 0,
      maPhong: 0,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 0,
      maNguoiDung: 0,
    },
    validationSchema: Yup.object({
      maPhong: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "Room code does not exist.", (value) =>
          listMaPhong.some((item) => item.id == value)
        ),
      maNguoiDung: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "User does not exist.", (value) =>
          listNguoiDung.some((item) => item.id == value)
        ),
      ngayDen: Yup.string()
        .required("Please do not leave it blank")
        .test(
          "is-before-ngayDi",
          "Check-in date must be before check-out date",
          function (value) {
            const { ngayDi } = this.parent;
            if (!value || !ngayDi) return true; // Nếu một trong hai giá trị trống, bỏ qua kiểm tra
            const ngayDen = dayjs(value, "YYYY-MM-DDTHH:mm:ss");
            const ngayDiDate = dayjs(ngayDi, "YYYY-MM-DDTHH:mm:ss");
            return ngayDen.isBefore(ngayDiDate);
          }
        ),
      ngayDi: Yup.string()
        .required("Please do not leave it blank")
        .test(
          "is-after-ngayDen",
          "Check-out date must be after check-in date",
          function (value) {
            const { ngayDen } = this.parent;
            if (!value || !ngayDen) return true; // Nếu một trong hai giá trị trống, bỏ qua kiểm tra
            const ngayDenDate = dayjs(ngayDen, "YYYY-MM-DDTHH:mm:ss");
            const ngayDi = dayjs(value, "YYYY-MM-DDTHH:mm:ss");
            return ngayDi.isAfter(ngayDenDate);
          }
        ),
      soLuongKhach: Yup.string().required("Please do not leave it blank"),
    }),
    onSubmit: (values) => {
      console.log(values);
      datPhongService
        .themDatPhong(values)
        .then((res) => {
          console.log(res);
          handleCloseModal();
          layListDatPhongService();
          handleNotification("success", res.data.message, 1500);
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
    },
  });
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
  return (
    <form action="" onSubmit={handleSubmit} className="space-y-4">
      <InputCustome
        labelContent={"ID"}
        disable={true}
        value={values.id}
        handleChange={handleChange}
        name={"id"}
        handleBlur={handleBlur}
        error={errors.id}
        touched={touched.id}
      />
      <InputCustome
        labelContent={"userID"}
        value={values.maNguoiDung}
        handleChange={handleChange}
        name={"maNguoiDung"}
        handleBlur={handleBlur}
        error={errors.maNguoiDung}
        touched={touched.maNguoiDung}
      />
      <InputCustome
        labelContent={"roomID"}
        value={values.maPhong}
        handleChange={handleChange}
        name={"maPhong"}
        handleBlur={handleBlur}
        error={errors.maPhong}
        touched={touched.maPhong}
      />
      <div>
        <label htmlFor="">checkInDate</label>
        <DatePicker
          name="ngayDen"
          format={"YYYY-MM-DDTHH:mm:ss"}
          className="w-full"
          onBlur={handleBlur}
          showTime
          onChange={(date, dateString) => {
            setFieldValue("ngayDen", dateString);
          }}
        />
        {touched.ngayDen && errors.ngayDen ? (
          <p className="text-red-500 mt-1">{errors.ngayDen}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="">checkOutDate</label>
        <DatePicker
          format={"YYYY-MM-DDTHH:mm:ss"}
          name="ngayDi"
          className="w-full"
          onBlur={handleBlur}
          showTime
          onChange={(date, dateString) => {
            setFieldValue("ngayDi", dateString);
          }}
        />
        {touched.ngayDi && errors.ngayDi ? (
          <p className="text-red-500 mt-1">{errors.ngayDi}</p>
        ) : null}
      </div>
      <InputCustome
        labelContent={"guestCount"}
        value={values.soLuongKhach}
        handleChange={handleChange}
        name={"soLuongKhach"}
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

export default FormAddReservation;
