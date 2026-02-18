import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const SpinnerRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (count === 0) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mt-4">Redirecting to login in {count} seconds...</h1>
      <Spinner />
    </div>
  );
};

export default function PrivateRoute() {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Checking user auth with token:", auth?.token ? "present" : "missing");
        const res = await axios.get("/api/v1/auth/user-auth");
        console.log("User auth response:", res.data);
        setOk(res.data.ok);
      } catch (error) {
        console.log("User auth error:", error.response?.data || error.message);
        setOk(false);
      }
    };
    
    if (auth?.token) {
      authCheck();
    } else {
      console.log("No token found, redirecting to login");
      setOk(false);
    }
  }, [auth?.token]);

  if (ok === null) return <Spinner />;

  if (!ok) return <SpinnerRedirect />;

  return <Outlet />;
}
