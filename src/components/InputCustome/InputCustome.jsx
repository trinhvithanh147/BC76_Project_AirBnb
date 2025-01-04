import { Input } from "antd";

const InputCustome = ({
  name,
  type = "text",
  id,
  handleChange,
  value,
  className = "",
  touched,
  error,
  handleBlur,
  placeHolder,
  labelContent,
  className2,
  disable = false,
}) => {
  return (
    <div className={className2}>
      <label htmlFor={id}>{labelContent}</label>
      <Input
        disabled={disable}
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
  );
};

export default InputCustome;
