import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
    pozos: [],
    cargandoListarPozos: false,
    errorListarPozos: null,
};

export const pozosSlice = createSlice({
    name: 'pozos', 
    initialState: defaultInitialState,
    reducers: {
        onStartListarPozo : ( state ) => {
            state.cargandoListarPozos = true;
            state.errorListarPozos = null;
        },
        onOKListarPozo : ( state, { payload : pozos} ) => {
            state.pozos = pozos;
        },
        onErrorListarPozo : ( state, { payload} ) => {
            state.errorListarPozos = payload;
        },
        onFinallyListarPozo : ( state ) => {
            state.cargandoListarPozos = true;
        },
        reset : (state)=>{
            state = defaultInitialState;
        }
    }
});

export const {
    onStartListarPozo,
    onOKListarPozo,
    onErrorListarPozo,
    onFinallyListarPozo,
    reset
} = pozosSlice.actions;