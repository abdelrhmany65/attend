import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  general: true,
  sound: false,
  vibrate: true,
  appUpdates: false,
  billReminder: true,
  promotion: true,
  discount: false,
  paymentRequest: false,
  newService: false,
  newTips: true,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    toggleNotification: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
