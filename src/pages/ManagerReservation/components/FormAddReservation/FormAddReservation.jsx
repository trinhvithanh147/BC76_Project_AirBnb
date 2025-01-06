import { Button, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { useFormik } from "formik";
import { datPhongService } from "../../../../services/datPhong.service";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import * as Yup from "yup";
import { phongService } from "../../../../services/phong.service";
const FormAddReservation = ({ handleCloseModal, layListDatPhongService }) => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [listMaPhong, setListMaPhong] = useState([]);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
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
      ngayDen: Yup.string().required("Please do not leave it blank"),
      ngayDi: Yup.string().required("Please do not leave it blank"),
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
        })
        .catch((err) => {
          console.log(err);
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
          className="w-full"
          showTime
          onChange={(date, dateString) => {
            setFieldValue("ngayDen", dateString);
          }}
        />
      </div>
      <div>
        <label htmlFor="">checkOutDate</label>
        <DatePicker
          name="ngayDi"
          className="w-full"
          showTime
          onChange={(date, dateString) => {
            setFieldValue("ngayDi", dateString);
          }}
        />
      </div>
      <InputCustome
        labelContent={"guestCount"}
        value={values.soLuongKhach}
        handleChange={handleChange}
        name={"soLuongKhach"}
      />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default FormAddReservation;
