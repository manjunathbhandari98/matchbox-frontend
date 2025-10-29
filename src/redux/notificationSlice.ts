import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NotificationType } from "../types";


interface NotificationsState {
  list: NotificationType[];
}

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
      state.list = action.payload;
    },
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.list.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.list.find((n) => n.id === action.payload);
      if (notif) notif.isRead = true;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.list = [];
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  removeNotification,
  clearAllNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
