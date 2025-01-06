import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { useFormik } from "formik";
import { Button, Checkbox } from "antd";
import * as Yup from "yup";
import { vitriService } from "../../../../services/vitri.service";
import { phongService } from "../../../../services/phong.service";
import { NotificationContext } from "../../../../App";
const FormAddRoom = ({ handleCloseModal, layListPhong }) => {
  const [listViTri, setListViTri] = useState([]);
  const handleNotification = useContext(NotificationContext);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    values,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: 0,
      tenPhong: "",
      giaTien: 0,
      maViTri: 0,
      hinhAnh: "",
      moTa: "",
      phongNgu: 0,
      phongTam: 0,
      giuong: 0,
      khach: 0,
      wifi: false,
      bep: false,
      dieuHoa: false,
      doXe: false,
      hoBoi: false,
      mayGiat: false,
      tivi: false,
      banLa: false,
      banUi: false,
    },
    validationSchema: Yup.object({
      maViTri: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "Room code does not exist.", (value) =>
          listViTri.some((item) => item.id == value)
        ),
      tenPhong: Yup.string().required("Please do not leave it blank"),
      giaTien: Yup.number().required("Please do not leave it blank"),
      hinhAnh: Yup.string().required("Please do not leave it blank"),
      moTa: Yup.string().required("Please do not leave it blank"),
      phongNgu: Yup.number().min(1, "At least 1 bedroom").required("Required"),
      phongTam: Yup.number().min(1, "At least 1 bathroom").required("Required"),
      giuong: Yup.number().min(1, "At least 1 bed").required("Required"),
      khach: Yup.number().min(1, "At least 1 guest").required("Required"),
    }),
    onSubmit: (values) => {
      phongService
        .themPhongThue(values)
        .then((res) => {
          console.log(res);
          handleCloseModal();
          resetForm();
          handleNotification("success", res.data.message, 1500);
          layListPhong();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
    },
  });
  useEffect(() => {
    vitriService
      .vitri()
      .then((res) => {
        console.log(res);
        setListViTri(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
        labelContent={"Room Name"}
        name={"tenPhong"}
        value={values.tenPhong}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.tenPhong}
        touched={touched.tenPhong}
      />
      <InputCustome
        labelContent={"Price"}
        name={"giaTien"}
        value={values.giaTien}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.giaTien}
        touched={touched.giaTien}
      />
      <InputCustome
        labelContent={"Location ID"}
        name={"maViTri"}
        value={values.maViTri}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.maViTri}
        touched={touched.maViTri}
      />
      <InputCustome
        labelContent={"Image"}
        name={"hinhAnh"}
        value={values.hinhAnh}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.hinhAnh}
        touched={touched.hinhAnh}
      />
      <InputCustome
        labelContent={"Description"}
        name={"moTa"}
        value={values.moTa}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.moTa}
        touched={touched.moTa}
      />
      <InputCustome
        labelContent={"Bedrooms"}
        name={"phongNgu"}
        value={values.phongNgu}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.phongNgu}
        touched={touched.phongNgu}
      />
      <InputCustome
        labelContent={"Bathrooms"}
        name={"phongTam"}
        value={values.phongTam}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.phongTam}
        touched={touched.phongTam}
      />
      <InputCustome
        labelContent={"Beds"}
        name={"giuong"}
        value={values.giuong}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.giuong}
        touched={touched.giuong}
      />
      <InputCustome
        labelContent={"Guests"}
        name={"khach"}
        value={values.khach}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.khach}
        touched={touched.khach}
      />
      <div className="grid grid-cols-2 gap-4">
        <Checkbox name="wifi" checked={values.wifi} onChange={handleChange}>
          Wifi
        </Checkbox>
        <Checkbox name="bep" checked={values.bep} onChange={handleChange}>
          Kitchen
        </Checkbox>
        <Checkbox
          name="dieuHoa"
          checked={values.dieuHoa}
          onChange={handleChange}
        >
          Air Conditioner
        </Checkbox>
        <Checkbox name="doXe" checked={values.doXe} onChange={handleChange}>
          Parking
        </Checkbox>
        <Checkbox name="hoBoi" checked={values.hoBoi} onChange={handleChange}>
          Swimming Pool
        </Checkbox>
        <Checkbox
          name="mayGiat"
          checked={values.mayGiat}
          onChange={handleChange}
        >
          Washing Machine
        </Checkbox>
        <Checkbox name="tivi" checked={values.tivi} onChange={handleChange}>
          TV
        </Checkbox>
        <Checkbox name="banLa" checked={values.banLa} onChange={handleChange}>
          Iron
        </Checkbox>
        <Checkbox name="banUi" checked={values.banUi} onChange={handleChange}>
          Ironing Board
        </Checkbox>
      </div>
      <Button htmlType="submit" type="primary">
        Confirm
      </Button>
    </form>
  );
};

export default FormAddRoom;
