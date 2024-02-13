import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const setState = (user, loading, error) => {
    setUser(user);
    setLoading(loading);
    setLoginError(error);
  };
  useEffect(() => {
    axios
      .get("auth/currentUser")
      .then((res) => {
        setState(res.data.user, false, null);
      })
      .catch((error) => {
        // we don't care about this error so I'm not storing it
        setState(null, false, null);
      });
  }, []);

  const login = (user) => {
    setLoading(true);
    const { email, password } = user;
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
        setLoginError(null);
        navigate("/");
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
        setLoginError(err.response.data.message || err.response.data);
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
      value={{
        user,
        errors,
        loading,
        register,
        login,
        logout,
        setUser,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
