import { createSlice } from '@reduxjs/toolkit';

const SESSION_NAME = `${import.meta.env.VITE_SESSION_NAME}`;

const defaultInitialState = {
    user : JSON.parse(window.localStorage.getItem(SESSION_NAME)) || null,
    status : JSON.parse(window.localStorage.getItem(SESSION_NAME)) || "non-authenticated", //authenticated, non-authenticated
    message: ""
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: defaultInitialState,
    reducers: {
        onChecking : (state)=>{
            state.status = "checking";
        },
        onLogin : (state, {payload})=>{
            state.status = "authenticated";
            state.user = payload;

            window.localStorage.setItem(SESSION_NAME, JSON.stringify(payload));
        },
        onLogout : (state)=>{
            state.status = "non-authenticated";
            state.user = null;
            state.message = "";
            window.localStorage.removeItem(SESSION_NAME);
        },
        onErrorLogin : (state, {payload})=>{
            state.status = "checking";
            state.message = payload;
            window.localStorage.removeItem(SESSION_NAME);
        }
    }
});

export const {
    onChecking, onErrorLogin, onLogin, onLogout
} = authSlice.actions;