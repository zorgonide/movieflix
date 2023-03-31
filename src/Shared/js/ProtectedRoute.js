import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../Components/HeaderComponent/HeaderComponent";
import { useUser } from "./user-context";

function ProtectedRoute(props) {
  const {
    state: { loggedIn },
  } = useUser();
  let verified = loggedIn;
  return verified ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
}

export default ProtectedRoute;
