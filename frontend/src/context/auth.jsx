import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

// Get auth from localStorage synchronously during initialization
const getInitialAuth = () => {
  try {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      // Set axios header immediately when loading auth
      if (parsed.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
      }
      return { user: parsed.user, token: parsed.token };
    }
  } catch (error) {
    console.log("Error parsing auth from localStorage:", error);
  }
  return { user: null, token: "" };
};

const AuthProvider = ({ children }) => {
  // Configure axios defaults
  axios.defaults.withCredentials = true;
  
  const [auth, setAuth] = useState(getInitialAuth());

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
