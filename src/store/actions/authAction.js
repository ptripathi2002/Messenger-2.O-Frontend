import axios from "axios";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";

// Assume you have set an environment variable for the API base URL
const API_BASE_URL = https://messenger-2-o.onrender.com || "";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json", // Fixed a typo: "josn" -> "json"
      },
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/messenger/user-register`,
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

// The rest of the code remains unchanged
// ...

export const userLogout = () => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/messenger/user-logout`);
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
    }
  } catch (error) {}
};
