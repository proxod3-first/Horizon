import { Navigate, Outlet } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthRoutes = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return !user ? <Outlet /> : <Navigate to="/Homepage"/>;
};
export default AuthRoutes;
