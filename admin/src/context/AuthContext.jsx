import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

import Loading from "app/components/MatxLoading";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    if (!decodedToken?.sub) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return false;
    }

    return true; 
  } catch (error) {
    console.error("Token decoding error:", error);
    return false;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT"
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const { data } = await axiosInstance.post("/auth/login", {email, password });
    const { accessToken, user} = data;
    setSession(accessToken);
    dispatch({ type: "LOGIN", payload: { user } });
  };
  const otpLogin = async (phone_number, otp) => {
    const { data } = await axiosInstance.post("/auth/otpLogin", {phone_number, otp});
    const { accessToken, user} = data;
    setSession(accessToken);
    dispatch({ type: "LOGIN", payload: { user } });
  };
  const register = async (formdata, profileImage) => {
    const requestData = new FormData();
    requestData.append('formData', JSON.stringify(formdata));
    requestData.append('profileImage', profileImage);
    
    const { data } = await axiosInstance.post("/auth/register", requestData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user } });
    return data;
  };
  const generateLoginOtp = async (phone_number) => {
    try {
      const { data } = await axiosInstance.post("/auth/generateLoginOtp", {phone_number});
      return data;
    } catch (error) {
      return error.response.data
    }
  }
  const generateOtp = async (phone_number, email) => {
    try {
      const { data } = await axiosInstance.post("/auth/generateOtp", { phone_number, email });
      return data;
    } catch (error) {
      return error.response.data
    }
  };
  const verifyOtp = async (phone_number, otp) => {
    const { data } = await axiosInstance.post("/auth/verifyOtp", {phone_number, otp });
    return data;
  };
  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          const response = await axiosInstance.get("/auth/profile");
          const { user } = response.data;

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null }
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      method: "JWT", 
      login, 
      otpLogin,
      generateLoginOtp,
      logout, 
      register, 
      generateOtp,
      verifyOtp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
