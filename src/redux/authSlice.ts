import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading:false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        startLoading: state =>{
            state.loading = true;
            state.error = null;
        },

        loginSuccess : (state, action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('token', action.payload.token)
        },

          signupSuccess : (state, action) =>{
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('token', action.payload.token)
        },
         authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    }

})

export const {
  startLoading,
  loginSuccess,
  signupSuccess,
  authFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;