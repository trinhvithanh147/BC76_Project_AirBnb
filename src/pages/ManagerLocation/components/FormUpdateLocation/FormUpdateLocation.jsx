import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { Button } from "antd";
import { vitriService } from "../../../../services/vitri.service";
import { NotificationContext } from "../../../../App";
const FormUpdateLocation = ({ dataForm, handleCloseModal, layListViTri }) => {
  console.log(dataForm);
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
        .capNhatviTri(values.id, values)
        .then((res) => {
          console.log(res);
          layListViTri();
          handleNotification("success", res.data.message, 1500);
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", err.response.data.message, 1500);
        });
      console.log(values);
      handleCloseModal();
      resetForm();
    },
  });
  useEffect(() => {
    if (dataForm) {
      console.log(dataForm);
      setValues({
        id: dataForm.id || 0,
        tenViTri: dataForm.tenViTri || "",
        tinhThanh: dataForm.tinhThanh || "",
        quocGia: dataForm.quocGia || "",
        hinhAnh: dataForm.hinhAnh || "",
      });
    }
  }, [dataForm]);
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

export default FormUpdateLocation;
