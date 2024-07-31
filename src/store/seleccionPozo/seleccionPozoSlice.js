import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
    pozos: [],
    cargandoListarPozos: false,
    errorListarPozos: null,
    pozo: {
        id: null,
        id_pozo: '',
        valor_inicial: '',
        hora_inicial: '',
        valor_final: '',
        hora_final: '',
        valor_total: '',
        horas_total: '',
        enviado_inicial: 0,
        enviado_final: 0
    },
    cargandoLeerPozo: false,
    errorLeerPozo: null,
    cargandoRegistrarPozo: false,
    errorRegistrarPozo: null,
    cargandoEliminarPozo: false,
    errorEliminarPozo: null,
    submitOK: 0
};

export const seleccionPozoSlice = createSlice({
    name: 'seleccionPozo', 
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
            state.cargandoListarPozos = false;
        },
        onStartLeerPozo : (state)=>{
            state.cargandoLeerPozo = true;
            state.errorLeerPozo = null;
            state.submitOK = 0;
        },
        onOKLeerPozo : (state, { payload : pozo }) => {
            state.pozo = pozo;
        },
        onErrorLeerPozo : (state, { payload }) => {
            state.errorLeerPozo = payload;
        },
        onFinallyLeerPozo: (state)=>{
            state.cargandoLeerPozo = false;
        },
        onStartRegistrarPozo : (state) => {
            state.cargandoRegistrarPozo = true;
            state.errorRegistrarPozo = null;
        },
        onOKRegistrarPozo : (state, { payload : nuevoPozo }) => {
            state.pozo = nuevoPozo;
            state.pozos.push(nuevoPozo);
            state.submitOK++;
        },
        onOKActualizarPozo: ( state, { payload: editadoPozo }) => {
            state.pozo = {...state.pozo, ...editadoPozo};
            state.pozos.map( pozo => {
                if (pozo.id === editadoPozo.id){
                    return {...pozo, ...editadoPozo};
                }

                return pozo;
            });
            state.submitOK++;
        },
        onErrorRegistrarPozo : (state, {payload}) => {
            state.errorRegistrarPozo = payload;
        },
        onFinallyRegistrarPozo : ( state ) => {
            state.cargandoRegistrarPozo  = false;
        },
        onSetRegistrarPozoVacio: ( state ) => {
            state.pozo = defaultInitialState.pozo;
            state.submitOK = 0;
        },
        modificandoRegistroPozo : ( state, { payload }) => {
            const { key, value } = payload;
            state.pozo[key] = value;
        },
        onStartEliminarRegistroPozo : ( state ) => {
            state.cargandoEliminarPozo = true;
        },
        onOKEliminarRegistroPozo : ( state, { payload : id} ) => {
            state.pozos = state.pozos.filter( p => {
                return p.id != id;
            });
        },
        onErrorEliminarRegistroPozo : ( state, { payload: error}) => {
            state.errorEliminarPozo = error;
        },
        onFinallyEliminarRegistroPozo : ( state ) => {
            state.cargandoEliminarPozo = false;
        },
        clearErrors : ( state ) =>{
            state.errorEliminarPozo = null;
            state.errorLeerPozo = null;
            state.errorListarPozos = null;
            state.errorRegistrarPozo = null;
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
    onStartLeerPozo,
    onOKLeerPozo,
    onErrorLeerPozo,
    onFinallyLeerPozo,
    onStartRegistrarPozo,
    onOKRegistrarPozo,
    onOKActualizarPozo,
    onErrorRegistrarPozo,
    onFinallyRegistrarPozo,
    onSetRegistrarPozoVacio,
    modificandoRegistroPozo,
    onStartEliminarRegistroPozo,
    onOKEliminarRegistroPozo,
    onErrorEliminarRegistroPozo,
    onFinallyEliminarRegistroPozo,
    clearErrors,
    reset
} = seleccionPozoSlice.actions;