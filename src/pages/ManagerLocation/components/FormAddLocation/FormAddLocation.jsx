import { Button } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { vitriService } from "../../../../services/vitri.service";
import { NotificationContext } from "../../../../App";
const FormAddLocation = ({ handleCloseModal, layListViTri }) => {
  const handleNotification = useContext(NotificationContext);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: 0,
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    validationSchema: Yup.object({
      tenViTri: Yup.string().required("Please do not leave it blank"),
      tinhThanh: Yup.string().required("Please do not leave it blank"),
      quocGia: Yup.string().required("Please do not leave it blank"),
      hinhAnh: Yup.string().required("Please do not leave it blank"),
    }),
    onSubmit: (values) => {
      vitriService
        .themviTri(values)
        .then((res) => {
          console.log(res);
          resetForm();
          layListViTri();
          handleCloseModal();
          handleNotification("success", res.data.message, 1500);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
    },
  });

  return (
    <form action="" className="space-y-4" onSubmit={handleSubmit}>
      <InputCustome
        disable={true}
        labelContent={"ID"}
        name={"id"}
        value={values.id}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.id}
        touched={touched.id}
      />
      <InputCustome
        labelContent={"RoomName"}
        name={"tenViTri"}
        value={values.tenViTri}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.tenViTri}
        touched={touched.tenViTri}
      />
      <InputCustome
        labelContent={"Price"}
        name={"tinhThanh"}
        value={values.tinhThanh}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.tinhThanh}
        touched={touched.tinhThanh}
      />
      <InputCustome
        labelContent={"Country"}
        name={"quocGia"}
        value={values.quocGia}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.quocGia}
        touched={touched.quocGia}
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

      <Button htmlType="submit">Xác nhận</Button>
    </form>
  );
};

export default FormAddLocation;
