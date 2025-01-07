import { UserOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "antd";
import { TbLockPassword } from "react-icons/tb";
import Icon from "../../components/Icon";
import "./adminLogin.scss";
import InputAdminLogin from "./components/InputAdminLogin/InputAdminLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../../App";
const AdminLogin = () => {
  const navigate = useNavigate();
  const handleNotification = useContext(NotificationContext);
  useEffect(() => {
    const dataString = localStorage.getItem("userInfo");
    if (dataString) {
      const data = JSON.parse(dataString);
      if (data.user.role == "ADMIN") {
        window.location.href = pathDefault.admin;
      }
    }
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "", // thường trùng với thuộc tính name để liên kết giá trị
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            if (res.data.content.user.role == "ADMIN") {
              localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.content)
              );
              handleNotification("success", "Đăng nhập thành công", 1500);
              setTimeout(() => {
                navigate(pathDefault.admin);
                localStorage.getItem("userInfo");
              }, 1500);
            }
          })

          .catch((err) => {
            console.log(err);
            handleNotification("error", err.response.data.content);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Please do not leave this field empty")
          .email("Please enter a valid email address"),
        password: Yup.string().required("Please do not leave this field empty"),
      }),
    });

  return (
    <section className="h-screen bg-[#F1F7FE]">
      <div className="flex justify-center items-center h-full">
        <div className="w-[1200px] lg:h-[700px] bg-white rounded-xl p-10 shadow-2xl h-screen ">
          <div className="grid grid-cols-2 flex-col h-full justify-center items-center lg:items-start">
            <div className="lg:col-span-1 hidden lg:flex   border-r-2 h-full">
              <DotLottieReact
                src="/assets/animation/admin-login.json"
                loop
                autoplay
                onLoaded={() => console.log("Animation loaded!")}
              />
            </div>
            <div className="lg:col-span-1 col-span-2 p-0 lg:pt-14 lg:px-16 h-full lg:h-full">
              <div className="flex justify-between flex-col  h-full">
                <div>
                  <div className="flex items-center justify-center mb-10">
                    <Icon.logoAdminLogin />
                  </div>
                  <h3 className="text-[16px] font-medium relative mb-5">
                    <span className="text_login">Login</span> as a Admin User
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <InputAdminLogin
                      prefix={<UserOutlined className="text-[16px]" />}
                      placeholder={"Enter your email"}
                      className={" p-3 rounded-full"}
                      name={"email"}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                    />
                    <InputAdminLogin
                      prefix={<TbLockPassword className="text-[16px]" />}
                      placeholder={"Enter your password"}
                      className={"p-3 rounded-full"}
                      type={"password"}
                      name={"password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched.password}
                      value={values.password}
                      error={errors.password}
                    />
                    <Button
                      variant="solid"
                      htmlType="submit"
                      className="w-full  p-5 rounded-full  h-[48px] flex items-center justify-center mb-2 tracking-[0.2em] bg-violet-500 text-white hover:!border-violet-500 hover:!text-violet-500"
                    >
                      LOGIN
                    </Button>
                    <div className="text-center mt-5">
                      <span className="block hover:underline cursor-pointer">
                        Forget your password? <br />
                        <span className="text-violet-500 font-medium border-none">
                          Get help Signed in
                        </span>
                      </span>
                    </div>
                  </form>
                </div>
                <span className="text-center block hover:underline cursor-pointer">
                  Terms of use Privacy policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
