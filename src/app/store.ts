import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice';
import notificationReducer from '../redux/notificationSlice';
import themeReducer from '../redux/themeSlice';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        theme:themeReducer,
        notification: notificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
