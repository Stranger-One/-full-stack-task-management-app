import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthProtector = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !pathname.includes("/auth")) {
      navigate("/auth/login");
    }
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthProtector;
