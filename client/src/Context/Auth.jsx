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
        setLoading(false);
        let errorMessage;

        if (
          typeof err.response.data === "object" &&
          err.response.data.message
        ) {
          // Assuming the errors are returned in a concatenated string within err.response.data.message
          errorMessage = err.response.data.message
            .split(",")
            .map((err) => {
              // Split each error at the first colon to separate the field name from the message
              const parts = err.split(":");
              if (parts.length > 1) {
                // Return everything after the first colon, which should be the error message
                return parts.slice(1).join(":").trim();
              }
              return err; // Return the original error if it doesn't match the expected format
            })
            .join(", ");
        } else if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else {
          errorMessage = "An unexpected error occurred. Please try again.";
        }

        setErrors(errorMessage);
        setState(null, false, err.response.data);
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
