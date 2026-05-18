import NavbarAfterLogin from "./common/NavbarAfterLogin";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavbarAfterLogin />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
