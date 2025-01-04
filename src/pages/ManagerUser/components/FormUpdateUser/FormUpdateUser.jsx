import { Button, DatePicker, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import * as Yup from "yup";
const FormUpdateUser = ({
  formData,
  layDanhSachNguoiDung,
  handleCloseModal,
}) => {
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    handleSubmit,
    setValues,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please do not leave it blank"),
      email: Yup.string()
        .required("Please do not leave it blank")
        .email("Invalid email address"),
      phone: Yup.string()
        .required("Please do not leave it blank")
        .matches(
          /^(0[3|5|7|8|9])+([0-9]{8})$/,
          "Invalid phone number. Phone number must start with 03, 05, 07, 08, or 09."
        ),
      birthday: Yup.string()
        .required("Please do not leave it blank")
        .max(new Date(), "Birthday cannot be in the future"),
    }),
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService
        .capNhatNguoiDung(values.id, values)
        .then((res) => {
          console.log(res);
          layDanhSachNguoiDung();
          handleCloseModal();
          resetForm();
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
        id: formData.id || "",
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        gender: formData.gender,
        birthday: formData.birthday || "",
      });
    }
  }, [formData]);

  return (
    <form action="" onSubmit={handleSubmit} className="space-y-4">
      <InputCustome
        labelContent={"ID"}
        id={"id"}
        name="id"
        disable={true}
        value={values.id}
        touched={touched.id}
      />
      <InputCustome
        labelContent={"Name"}
        id={"name"}
        name="name"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.name}
        touched={touched.name}
      />
      <InputCustome
        labelContent={"Email"}
        id={"email"}
        name="email"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.email}
        touched={touched.email}
      />
      <InputCustome
        labelContent={"Phone"}
        id={"phone"}
        name="phone"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.phone}
        touched={touched.phone}
      />
      <div className="datePicker">
        <label htmlFor="">Date of Birth</label>
        <DatePicker
          format={"DD-MM-YYYY"}
          className="w-full"
          onChange={(date, dateString) => {
            console.log(date);
            console.log(dateString);
            setFieldValue("birthday", dateString);
          }}
        />
      </div>
      <div className="gender">
        <label htmlFor="">Gender: </label>
        <Select
          value={values.gender}
          style={{ width: 120 }}
          onChange={(value, option) => {
            console.log(value);
            setFieldValue("gender", value);
          }}
          options={[
            { value: true, label: "Male" },
            { value: false, label: "FeMale" },
          ]}
        />
      </div>

      <Button htmlType="submit">Xác nhận</Button>
    </form>
  );
};

export default FormUpdateUser;
