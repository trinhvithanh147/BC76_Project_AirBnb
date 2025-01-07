import { useRoutes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { pathDefault } from "./common/path";
import { Children, createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ManagerUser from "./pages/ManagerUser/ManagerUser";
import ManagerReservation from "./pages/ManagerReservation/ManagerReservation";
import ManagerComments from "./pages/ManagerComments/ManagerComments";
import ManagerRoom from "./pages/ManagerRoom/ManagerRoom";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProfileAdmin from "./pages/ProfileAdmin/ProfileAdmin";
export const NotificationContext = createContext();
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
  },
  {
    path: pathDefault.adminLogin,
    element: <AdminLogin />,
  },

  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      {
        path: pathDefault.profileAdmin,
        element: <ProfileAdmin />,
      },
      {
        index: true,
        element: <ManagerUser />,
      },
      {
        path: pathDefault.managerUser,
        element: <ManagerUser />,
      },
      {
        path: pathDefault.managerReservation,
        element: <ManagerReservation />,
      },
      {
        path: pathDefault.managerComments,
        element: <ManagerComments />,
      },
      {
        path: pathDefault.managerRoom,
        element: <ManagerRoom />,
      },
      {
        path: pathDefault.managerLocation,
        element: <ManagerLocation />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
