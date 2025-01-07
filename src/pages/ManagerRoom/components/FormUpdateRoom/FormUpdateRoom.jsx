import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { useFormik } from "formik";
import { Button, Checkbox } from "antd";
import * as Yup from "yup";
import { NotificationContext } from "../../../../App";
import { phongService } from "../../../../services/phong.service";
import { viTriService } from "../../../../services/viTri.service";

const FormUpdateRoom = ({ dataForm, handleCloseModal, layListPhong }) => {
  const handleNotification = useContext(NotificationContext);
  const [listviTri, setListViTri] = useState([]);
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
      tenPhong: Yup.string().required("Please do not leave it blank"),
      giaTien: Yup.number().required("Please do not leave it blank"),
      hinhAnh: Yup.string().required("Please do not leave it blank"),
      moTa: Yup.string().required("Please do not leave it blank"),
      phongNgu: Yup.number().min(1, "At least 1 bedroom").required("Required"),
      phongTam: Yup.number().min(1, "At least 1 bathroom").required("Required"),
      giuong: Yup.number().min(1, "At least 1 bed").required("Required"),
      khach: Yup.number().min(1, "At least 1 guest").required("Required"),
      maViTri: Yup.number()
        .required("Please do not leave it blank")
        .test("is-valid-user", "User does not exist.", (value) =>
          listviTri.some((item) => item.id == value)
        ),
    }),
    onSubmit: (values) => {
      phongService
        .capNhatPhongThue(values.id, values)
        .then((res) => {
          console.log(res);
          handleNotification("success", res.data.message, 1500);
          handleCloseModal();
          resetForm();
          layListPhong();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
    },
  });

  useEffect(() => {
    if (dataForm) {
      console.log(dataForm);
      setValues({
        id: dataForm.id || 0,
        tenPhong: dataForm.tenPhong || "",
        giaTien: dataForm.giaTien || 0,
        maViTri: dataForm.maViTri || 0,
        hinhAnh: dataForm.hinhAnh || "",
        moTa: dataForm.moTa || "",
        phongNgu: dataForm.phongNgu || 0,
        phongTam: dataForm.phongTam || 0,
        giuong: dataForm.giuong || 0,
        khach: dataForm.khach || 0,
        wifi: dataForm.wifi || false,
        bep: dataForm.bep || false,
        dieuHoa: dataForm.dieuHoa || false,
        doXe: dataForm.doXe || false,
        hoBoi: dataForm.hoBoi || false,
        mayGiat: dataForm.mayGiat || false,
        tivi: dataForm.tivi || false,
        banLa: dataForm.banLa || false,
        banUi: dataForm.banUi || false,
      });
    }
  }, [dataForm]);
  useEffect(() => {
    viTriService
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
      <Button
        htmlType="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
      >
        Submit
      </Button>
    </form>
  );
};

export default FormUpdateRoom;
