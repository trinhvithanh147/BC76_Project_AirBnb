import { Input } from 'antd'
import React from 'react'

const InputCustome = ({name,type="text",id,handleChange,value,className= "",touched,error,handleBlur,placeHolder,labelContent}) => {
  return (
    <div>
    <label htmlFor={id}>{labelContent}</label>
    <Input
    name={name}
    type={type}
    className={className}
    placeholder={placeHolder}
    value={value}
    // touched={touched}
    onBlur={handleBlur}
    onChange={handleChange}
    />
    {/* {touched && error ? <p className='text-red-500 mt-1'>{error}</p>: null} */}
    </div>
  )
}

export default InputCustome