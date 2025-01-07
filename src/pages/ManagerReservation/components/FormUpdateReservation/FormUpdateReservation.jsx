import { Button, DatePicker } from "antd";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import dayjs from "dayjs";
import { datPhongService } from "../../../../services/datPhong.service";
import * as Yup from "yup";
import { phongService } from "../../../../services/phong.service";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import { NotificationContext } from "../../../../App";
const FormUpdateReservation = ({
  formData,
  handleCloseModal,
  layListDatPhongService,
}) => {
  const handleNotification = useContext(NotificationContext);
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [listMaPhong, setListMaPhong] = useState([]);
  const {
    handleChange,
    values,
    setValues,
    handleSubmit,
    resetForm,
    setFieldValue,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      id: 0,
      maNguoiDung: 0,
      maPhong: 0,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 0,
    },
    validationSchema: Yup.object({
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
      maNguoiDung: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "User does not exist.", (value) =>
          listNguoiDung.some((item) => item.id == value)
        ),
      maPhong: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "Room ID does not exist.", (value) =>
          listMaPhong.some((item) => item.id == value)
        ),
    }),
    onSubmit: (values) => {
      datPhongService
        .capNhatDatPhong(values.id, values)
        .then((res) => {
          handleCloseModal();
          layListDatPhongService();
          handleNotification("success", res.data.message, 1500);
          resetForm();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
    },
  });

  useEffect(() => {
    if (formData) {
      console.log(formData);
      setValues({
        id: formData.id || 0,
        maPhong: formData.maPhong || 0,
        ngayDen: formData.ngayDen || "",
        ngayDi: formData.ngayDi || "",
        soLuongKhach: formData.soLuongKhach || 0,
        maNguoiDung: formData.maNguoiDung || 0,
      });
    }
  }, [formData]);

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
        value={values.id}
        labelContent={"ID"}
        name={"id"}
        disable={true}
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
        <label htmlFor="">checkOutDate</label>
        <DatePicker
          onBlur={handleBlur}
          format={"YYYY-MM-DDTHH:mm:ss"}
          className="w-full"
          onChange={(date, dateString) => {
            setFieldValue("ngayDi", dateString);
          }}
          value={values.ngayDi ? dayjs(values.ngayDi) : null}
        />
        {touched.ngayDi && errors.ngayDi ? (
          <p className="text-red-500 mt-1">{errors.ngayDi}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="">checkInDate</label>
        <DatePicker
          onBlur={handleBlur}
          format={"YYYY-MM-DDTHH:mm:ss"}
          className="w-full"
          onChange={(date, dateString) => {
            setFieldValue("ngayDen", dateString);
          }}
          value={values.ngayDen ? dayjs(values.ngayDen) : null}
        />
        {touched.ngayDen && errors.ngayDen ? (
          <p className="text-red-500 mt-1">{errors.ngayDen}</p>
        ) : null}
      </div>
      <InputCustome
        value={values.soLuongKhach}
        labelContent={"guestCount"}
        handleBlur={handleBlur}
        name={"soLuongKhach"}
        handleChange={handleChange}
        type="number"
        error={errors.soLuongKhach}
        touched={touched.soLuongKhach}
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

export default FormUpdateReservation;
