import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";
import { changePassword } from "../../services/employeeService";

const API_BASE_URL = "http://192.168.1.9:3003";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updatePassword: (state, action) => {
      state.user.password = action.payload; 
    },
  },
});

export const { loginSuccess, signupSuccess, logout, updateUser, updatePassword } = authSlice.actions;

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    const users = response.data;

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      dispatch(loginSuccess(user));

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome, ${user.name}! 👋`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid email or password.",
      });
    }
  } catch (error) {
    console.error("Login error:", error);

    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Please check your connection.",
    });
  }
};

// Signup action
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    dispatch(signupSuccess(response.data));

    Toast.show({
      type: "success",
      text1: "Account Created",
      text2: "Welcome! Your account has been successfully created.",
    });
  } catch (error) {
    console.error("Signup error:", error);

    Toast.show({
      type: "error",
      text1: "Signup Failed",
      text2: "An error occurred. Please try again.",
    });
  }
};

// Change password action
export const changePasswordAction = (id, currentPassword, newPassword) => async (dispatch, getState) => {
  try {
    await changePassword(id, currentPassword, newPassword);

    dispatch(updatePassword(newPassword));

    Toast.show({
      type: "success",
      text1: "Password Updated",
      text2: "Your password has been changed successfully!",
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Password Change Failed",
      text2: error.message || "An error occurred while changing your password.",
    });
  }
};

export default authSlice.reducer;
