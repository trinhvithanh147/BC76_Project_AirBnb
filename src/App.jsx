import { Route, useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import { Children, createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ManagerUser from "./pages/ManagerUser/ManagerUser";
import ManagerReservation from "./pages/ManagerReservation/ManagerReservation";
import ManagerComments from "./pages/ManagerComments/ManagerComments";
import ManagerRoom from "./pages/ManagerRoom/ManagerRoom";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RoomList from "./pages/RoomList/RoomList";
import RoomDetail from "./pages/RoomDetail.jsx/RoomDetail";
import { useState } from "react";

export const NotificationContext = createContext();
// B1: Tạo kho Context chứa dữ liệu cho App
export const AppContext = createContext();
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: pathDefault.homePage,
        element: <HomePage />,
      },
      {
        path: pathDefault.roomList,
        element: <RoomList />,
      },
      {
        path: pathDefault.roomDetail,
        element: <RoomDetail />,
      },
    ],
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
  {
    path: pathDefault.signUp,
    element: <SignUp />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
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
  // B2: Tạo dữ liệu muốn lưu
  const [idLocation, setIdLocation] = useState("");
  const [nameLocation, setNameLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  // B3: Tạo mảng chứa dữ liệu
  const value = {
    idLocation,
    setIdLocation,
    nameLocation,
    setNameLocation,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guest,
    setGuest,
  };
  console.log(checkIn);
  console.log(checkOut);

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
      {/* B5: Bọc kho chứa AppContext vào toàn bộ dự án  */}
      <AppContext.Provider value={value}>
        <NotificationContext.Provider value={handleNotification}>
          {routes}
          <ToastContainer />
        </NotificationContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
