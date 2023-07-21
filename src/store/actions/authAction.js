import axios from "axios";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";

// Create an instance of axios with the backend URL
const axiosInstance = axios.create({
  baseURL: "https://messenger-2-o-ues9.onrender.com/",
});

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/josn", // <-- Fix the typo here, it should be "application/json"
      },
    };
    try {
      const response = await axiosInstance.post(
        "/api/messenger/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axiosInstance.post(
        "/api/messenger/user-login",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogout = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/api/messenger/user-logout");
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
    }
  } catch (error) {}
};
