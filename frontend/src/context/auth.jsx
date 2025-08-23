import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ user: parsed.user, token: parsed.token });
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};


// custom hook
const useAuth = () =>  useContext(AuthContext)

export { useAuth, AuthProvider }
