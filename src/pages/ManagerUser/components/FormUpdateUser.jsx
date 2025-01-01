import React, { useEffect } from 'react'
import InputCustome from '../../../components/InputCustome/InputCustome'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Button } from 'antd';
import { nguoiDungService } from '../../../services/nguoiDung.service';

const FormUpdateUser = ({formData,layDanhSachNguoiDung,handleCloseModal}) => {

  

  const {handleChange,handleBlur,values,touched,handleSubmit,setValues} = useFormik({
    initialValues: {
      id: 0,
      name:"",
      email:"",
      birthday: "",
      phone: "",
      avatar: ""
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService.capNhatNguoiDung(values.id,values)
      .then((res)=>{
        console.log(res);
        layDanhSachNguoiDung()
        handleCloseModal()
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  })
  useEffect(()=>{
    if(formData){
      console.log(formData)
      setValues({
        id: formData.id || "",
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        avatar: formData.avatar || "",
        
      })
    }
  },[formData])

  return (
    <form action="" onSubmit={handleSubmit}>
    <InputCustome labelContent={"Name"} id={"name"} name="name" handleChange={handleChange} handleBlur={handleBlur} value={values.name} touched={touched.name} />
    <InputCustome labelContent={"Email"} id={"email"} name="email" handleChange={handleChange} handleBlur={handleBlur} value={values.email} touched={touched.email} />
    <InputCustome labelContent={"Phone"} id={"phone"} name="phone" handleChange={handleChange} handleBlur={handleBlur} value={values.phone} touched={touched.phone} />
    
    <Button htmlType='submit'>Xác nhận</Button>
    </form>
  )
}

export default FormUpdateUser