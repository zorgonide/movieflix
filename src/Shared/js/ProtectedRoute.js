import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../Components/HeaderComponent/HeaderComponent";
import { useUser } from "./user-context";

function ProtectedRoute(props) {
  const {
    state: { user },
  } = useUser();
  const { dispatch } = useUser();
  let verified = localStorage.getItem("user") ? true : false;
  if (verified && !user) {
    dispatch({ type: "login", user: JSON.parse(localStorage.getItem("user")) });
  }
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
