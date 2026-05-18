import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/Home";
import DonationPlaces from "../pages/DonationPlaces";
import RequestFormPage from "../pages/RequestForm";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyRequestsPage from "../pages/MyRequestsPage";
import ReceivedRequestsPage from "../pages/ReceivedRequestsPage";
import AcceptedUsersPage from "../pages/AcceptedUsersPage";
import NotFound from "../pages/NotFound";
import ProfilePage from "../pages/Profile";
import NavbarbeforeLogin from "../components/common/navbar/NavbarbeforeLogin";
import NavbarAfterLogin from "../components/common/navbar/NavbarAfterLogin";
import ScrollToTop from "../components/common/ScrollToTop"; 

function RootLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <>
      {isAuthenticated ? <NavbarAfterLogin /> : <NavbarbeforeLogin />}
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <ScrollToTop /> 
      <Outlet />
    </>
  );
}

export default function AppRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "donation-centers", element: <DonationPlaces /> },
        { path: "donate", element: <RequestFormPage /> },
        { path: "my-requests", element: <MyRequestsPage /> },
        { path: "received-requests", element: <ReceivedRequestsPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "accepted/:id", element: <AcceptedUsersPage /> }, 
        { path: "login", element: isAuthenticated ? <Navigate to="/" replace /> : <LoginPage /> },
        { path: "register", element: isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
