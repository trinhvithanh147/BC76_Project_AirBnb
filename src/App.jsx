import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import { createContext } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
export const NotificationContext = createContext();
const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
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
