import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";
import { changePassword } from "../../services/employeeService";


const API_BASE_URL = "http://192.168.1.8:3003";

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
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updatePassword: (state, action) => {
      if (state.user && state.user.password !== undefined) {
        state.user.password = action.payload;
      }
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

// Check-in action: يسجل وقت الدخول مع الموقع
export const checkInUser = (userId, latitude, longitude) => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.auth.user;
    if (!user || user.id !== userId) {
      throw new Error("User not found or not logged in");
    }
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];

    const updatedUser = {
      ...user,
      shifts: [
        ...(user.shifts || []),
        {
          date: currentDate,
          start: currentTime,
          location: { latitude, longitude },
          status: "Present",
        },
      ],
    };

    await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
    dispatch(updateUser(updatedUser));

    Toast.show({
      type: "success",
      text1: "Check-in Successful",
      text2: `You have checked in at ${currentTime}`,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    Toast.show({
      type: "error",
      text1: "Check-in Failed",
      text2: error.message || "An error occurred while checking in.",
    });
  }
};

// Check-out 
export const checkOutUser = (userId) => async (dispatch, getState) => {
  try {
    const state = getState();
    const user = state.auth.user;
    if (!user || user.id !== userId) {
      throw new Error("User not found or not logged in");
    }
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];

    // ابحث عن آخر شيفت مفتوح (الذي لا يحتوي على end)
    const updatedShifts = [...(user.shifts || [])];
    let found = false;
    for (let i = updatedShifts.length - 1; i >= 0; i--) {
      if (!updatedShifts[i].end) {
        updatedShifts[i] = { ...updatedShifts[i], end: currentTime };
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error("No active shift found to check out");
    }

    const updatedUser = { ...user, shifts: updatedShifts };
    await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser);
    dispatch(updateUser(updatedUser));

    Toast.show({
      type: "success",
      text1: "Check-out Successful",
      text2: `You have checked out at ${currentTime}`,
    });
  } catch (error) {
    console.error("Check-out error:", error);
    Toast.show({
      type: "error",
      text1: "Check-out Failed",
      text2: error.message || "An error occurred while checking out.",
    });
  }
};

export default authSlice.reducer;
