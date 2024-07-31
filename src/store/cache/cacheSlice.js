import { createSlice } from "@reduxjs/toolkit";

const CACHE_EMPRESA = `${import.meta.env.VITE_CACHE_EMPRESA}`;

const defaultInitialState = {
    empresa : window.localStorage.getItem(CACHE_EMPRESA) || '001',
};

export const cacheSlice = createSlice({
    name: 'cache',
    initialState: defaultInitialState,
    reducers: {
        actualizarEmpresa : (state, {payload})=>{
            window.localStorage.setItem(CACHE_EMPRESA, payload);
            state.empresa = payload;
        },
        reset : (state)=>{
            window.localStorage.removeItem(CACHE_EMPRESA);
            state = defaultInitialState;
        }
    }
});

export const {
    actualizarEmpresa,
    reset
} = cacheSlice.actions;