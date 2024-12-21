import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./adminLogin.scss";
import InputAdminLogin from "./components/InputAdminLogin/InputAdminLogin";
import { UserOutlined } from "@ant-design/icons";
import { TbLockPassword } from "react-icons/tb";
import { Button } from "antd";
import Icon from "../../components/Icon";
const AdminLogin = () => {
  return (
    <section className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex justify-center items-center h-full">
        <div className="w-[1200px] h-[700px] bg-white rounded-xl p-10 shadow-2xl">
          <div className="grid grid-cols-2 flex-col h-full ">
            <div className="col-span-1  border-r-2 ">
              <DotLottieReact
                src="src\assets\animation\admin-login.json"
                loop
                autoplay
              />
            </div>
            <div className="col-span-1 pt-14 px-16">
              <div className="flex justify-between flex-col h-full">
                <div>
                  <div className="flex items-center justify-center mb-5">
                    <Icon.logoAdminLogin />
                  </div>
                  <h3 className="text-[16px] font-medium relative mb-5">
                    <span className="text_login">Login</span> as a Admin User
                  </h3>
                  <form action="">
                    <InputAdminLogin
                      prefix={<UserOutlined className="text-[16px]" />}
                      placeholder={"Enter your email address"}
                      className={"mb-5 p-3 rounded-full"}
                    />
                    <InputAdminLogin
                      prefix={<TbLockPassword className="text-[16px]" />}
                      placeholder={"Enter your password"}
                      className={"mb-5 p-3 rounded-full"}
                      type={"password"}
                    />
                    <Button className="w-full  p-5 rounded-full  h-[48px] flex items-center justify-center mb-2 tracking-[0.2em] bg-violet-500 text-white hover:!border-violet-500 hover:!text-violet-500">
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
