import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
    dias: [],
    cargandoDias : false,
    errorDias : null,
    cargandoCrearDia: false,
    errorCrearDia: null
};

export const listaDiasSlice = createSlice({
    name: 'listaDias',
    initialState: defaultInitialState,
    reducers: {
        onStartDias : (state)=>{
            state.cargandoDias = true;
            state.errorDias = null;
        },
        onOKDias : (state, { payload : dias }) => {
            state.dias = dias.sort((a,b)=>{
                if (a.fecha_dia > b.fecha_dia) {
                    return -1;
                }
                if (a.fecha_dia < b.fecha_dia) {
                return 1;
                }
                return 0;
            });
        },
        onErrorDias : (state, { payload }) => {
            state.errorDias = payload;
        },
        onFinallyDias: (state)=>{
            state.cargandoDias = false;
        },
        onStartCrearDiaHoy : (state) => {
            state.cargandoCrearDia = false;
            state.errorCrearDia = null;
        },
        onOKCrearDiaHoy : (state, { payload : dias }) => {
            state.dias = dias;
        },
        onErrorCrearDiaHoy : (state) => {
            state.errorCrearDia = state;
        },
        onFinallyCrearDiaHoy : ( state ) => {
            state.cargandoCrearDia  = false;
        },
        reset : (state)=>{
            state = defaultInitialState;
        }
    }
});

export const {
    onStartDias,
    onOKDias,
    onErrorDias,
    onFinallyDias,
    onStartCrearDiaHoy,
    onOKCrearDiaHoy,
    onErrorCrearDiaHoy,
    onFinallyCrearDiaHoy,
    reset
} = listaDiasSlice.actions;