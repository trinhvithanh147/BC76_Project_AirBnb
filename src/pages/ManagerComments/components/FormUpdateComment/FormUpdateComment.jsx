import React, { useContext, useEffect } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { Button, DatePicker, Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { commentService } from "../../../../services/comment.service";
import { NotificationContext } from "../../../../App";
const FormUpdateComment = ({ dataForm, handleCloseModal, layListComment }) => {
  const handleNotification = useContext(NotificationContext);
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
        disable={true}
        name={"maPhong"}
        value={values.maPhong}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.maPhong}
        touched={touched.maPhong}
      />
      <InputCustome
        labelContent={"userID"}
        disable={true}
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
          className="w-full"
          showTime
          onChange={(date, dateString) => [
            setFieldValue("ngayBinhLuan", dateString),
          ]}
          value={values.ngayBinhLuan ? dayjs(values.ngayBinhLuan) : null}
        />
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
      <Button htmlType="submit">Xác nhận</Button>
    </form>
  );
};

export default FormUpdateComment;
