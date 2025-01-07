import { Button, DatePicker } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import dayjs from "dayjs";
import { datPhongService } from "../../../../services/datPhong.service";
import * as Yup from "yup";
const FormUpdateReservation = ({
  formData,
  handleCloseModal,
  layListDatPhongService,
}) => {
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
      ngayDen: Yup.string().required("Please do not leave it blank"),
      ngayDi: Yup.string().required("Please do not leave it blank"),
      soLuongKhach: Yup.string().required("Please do not leave it blank"),
    }),
    onSubmit: (values) => {
      datPhongService
        .capNhatDatPhong(values.id, values)
        .then((res) => {
          handleCloseModal();
          layListDatPhongService();
          resetForm();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    if (formData) {
      console.log(formData);
      setValues({
        id: formData.id,
        maPhong: formData.maPhong,
        ngayDen: formData.ngayDen || "",
        ngayDi: formData.ngayDi || "",
        soLuongKhach: formData.soLuongKhach,
        maNguoiDung: formData.maNguoiDung,
      });
    }
  }, [formData]);

  return (
    <form action="" onSubmit={handleSubmit} className="space-y-4">
      <InputCustome
        value={values.id}
        labelContent={"ID"}
        name={"id"}
        disable={true}
      />
      <InputCustome
        value={values.maNguoiDung}
        labelContent={"userID"}
        name={"maPhong"}
        disable={true}
      />
      <InputCustome
        value={values.maPhong}
        labelContent={"roomID"}
        name={"maPhong"}
        disable={true}
      />
      <div>
        <label htmlFor="">checkInDate</label>
        <DatePicker
          onBlur={handleBlur}
          showTime
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
        <label htmlFor="">checkOutDate</label>
        <DatePicker
          onBlur={handleBlur}
          showTime
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
