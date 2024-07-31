import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
    zonas: [],
    cargandoListarZonas: false,
    errorListarZonas: null,
};

export const zonasSlice = createSlice({
    name: 'zonas', 
    initialState: defaultInitialState,
    reducers: {
        onStartListarZona : ( state ) => {
            state.cargandoListarZonas = true;
            state.errorListarZonas = null;
        },
        onOKListarZona : ( state, { payload : zonas} ) => {
            state.zonas = zonas;
        },
        onErrorListarZona : ( state, { payload} ) => {
            state.errorListarZonas = payload;
        },
        onFinallyListarZona : ( state ) => {
            state.cargandoListarZonas = true;
        },
        reset : (state)=>{
            state = defaultInitialState;
        }
    }
});

export const {
    onStartListarZona,
    onOKListarZona,
    onErrorListarZona,
    onFinallyListarZona,
    reset
} = zonasSlice.actions;