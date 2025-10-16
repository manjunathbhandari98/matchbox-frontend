import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem('theme') || 'light';


const themeSlice = createSlice({
    name:'theme',
    initialState:{
        current: savedTheme
    },
    reducers:{
        toggleTheme: (state) =>{
            state.current = state.current === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.current);
        },
        setTheme: (state, action) =>{
            state.current = action.payload;
            localStorage.setItem('theme',action.payload);
        }
    }
});

export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;