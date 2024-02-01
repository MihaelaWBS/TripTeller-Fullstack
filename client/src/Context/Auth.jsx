import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const setState = (user, loading, errors) => {
    setUser(user);
    setLoading(loading);
    setErrors(errors);
  };
  useEffect(() => {
    axios
      .get("auth/currentUser")
      .then((res) => {
        console.log(res.data.user);
        setState(res.data.user, false, null);
      })
      .catch((error) => {
        // we don't care about this error so I'm not storing it
        setState(null, false, null);
      });
  }, []);

  const login = (user) => {
    setLoading(true);
    const { email, password } = user; // Extract only username and password
    axios
      .post("/auth/login", { email, password }) // Send only username and password
      .then((res) => {
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        setState(null, false, err.response.data);
      });
  };
  const register = (user) => {
    setLoading(true);
    axios
      .post("/auth/register", user)
      .then((res) => {
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        setState(null, false, err.response.data.errors);
      });
  };

  const logout = () => {
    axios.post("/auth/logout", {}).then((res) => {
      navigate("/");
      window.location.reload();
    });
  };

  /*   useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await axios.get("/auth/currentUser");
        setState(response.data.user, false, null);
      } catch (error) {
       
        setState(null, false, null);
      }
    };

    checkCurrentUser();
  }, []); */

  return (
    <AuthContext.Provider
      value={{ user, errors, setUser, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
