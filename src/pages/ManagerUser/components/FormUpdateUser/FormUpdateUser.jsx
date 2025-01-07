import { Button, DatePicker, Select } from "antd";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import InputCustome from "../../../../components/InputCustome/InputCustome";
import { nguoiDungService } from "../../../../services/nguoiDung.service";
import * as Yup from "yup";
import dayjs from "dayjs";
import { NotificationContext } from "../../../../App";
const FormUpdateUser = ({
  formData,
  layDanhSachNguoiDung,
  handleCloseModal,
}) => {
  const handleNotification = useContext(NotificationContext);
  const {
    errors,
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
        .test(
          "is-future-date",
          "Birthday must be a date in the future",
          (value) => {
            if (!value) return false;
            const selectedDate = dayjs(value, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            const today = dayjs();
            return selectedDate.isBefore(today, "day");
          }
        ),
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
          handleNotification("success", "Cập nhật thành công", 1500);
        })
        .catch((err) => {
          console.log(err);
          handleNotification("error", "Cập nhật thất bại", 1500);
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
        error={errors.name}
      />
      <InputCustome
        labelContent={"Email"}
        id={"email"}
        name="email"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.email}
        touched={touched.email}
        error={errors.email}
      />
      <InputCustome
        labelContent={"Phone"}
        id={"phone"}
        name="phone"
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={values.phone}
        touched={touched.phone}
        error={errors.phone}
      />
      <div className="datePicker">
        <label htmlFor="">Date of Birth</label>
        <DatePicker
          onBlur={handleBlur}
          format={"YYYY-MM-DDTHH:mm:ss.SSSZ"}
          className="w-full"
          onChange={(date, dateString) => {
            console.log(date);
            console.log(dateString);
            setFieldValue("birthday", dateString);
          }}
          value={values.birthday ? dayjs(values.birthday) : null}
        />
        {touched.birthday && errors.birthday ? (
          <p className="text-red-500 mt-1">{errors.birthday}</p>
        ) : null}
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

      <Button
        htmlType="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300"
      >
        Submit
      </Button>
    </form>
  );
};

export default FormUpdateUser;
