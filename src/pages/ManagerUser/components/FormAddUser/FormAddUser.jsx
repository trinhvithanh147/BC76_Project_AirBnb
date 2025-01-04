import React from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { Button, DatePicker, Select } from "antd";
import { useFormik } from "formik";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import * as Yup from "yup";
const FormAddUser = ({ handleCloseModal, layDanhSachNguoiDung }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    setValues,
    errors,
    touched,
    resetForm,
    values,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
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
        .themNguoiDung(values)
        .then((res) => {
          console.log(res);
          layDanhSachNguoiDung();
          resetForm();
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <form action="" onSubmit={handleSubmit} className="space-y-4">
      <InputCustome
        id={"name"}
        name={"name"}
        labelContent={"Name"}
        handleChange={handleChange}
        value={values.name}
        type="text"
      />
      <InputCustome
        id={"phone"}
        name={"phone"}
        labelContent={"Phone"}
        handleChange={handleChange}
        value={values.phone}
        type="text"
      />
      <InputCustome
        id={"email"}
        name={"email"}
        labelContent={"Email"}
        handleChange={handleChange}
        value={values.email}
        type="text"
      />
      <InputCustome
        id={"password"}
        name={"password"}
        labelContent={"password"}
        handleChange={handleChange}
        value={values.password}
        type="password"
      />
      <div>
        <label htmlFor="">Date of BirthDay</label>
        <DatePicker
          name="birthday"
          className="w-full"
          format={"DD-MM-YYYY"}
          onChange={(date, datePicker) => {
            setFieldValue("birthday", datePicker);
          }}
        />
      </div>
      <div className="flex items-center gap-x-4">
        <div>
          <label htmlFor="">Gender: </label>
          <Select
            defaultValue={true}
            style={{ width: 120 }}
            onChange={(value, option) => {
              setFieldValue("gender", value);
            }}
            options={[
              { value: true, label: "Male" },
              { value: false, label: "FeMale" },
            ]}
          />
        </div>
        <div>
          <label htmlFor="">Role: </label>
          <Select
            defaultValue={"USER"}
            style={{ width: 120 }}
            onChange={(value, option) => {
              setFieldValue("role", value);
            }}
            options={[
              { value: "ADMIN", label: "ADMIN" },
              { value: "USER", label: "USER" },
            ]}
          />
        </div>
      </div>
      <Button htmlType="submit">Xác nhận</Button>
    </form>
  );
};

export default FormAddUser;
