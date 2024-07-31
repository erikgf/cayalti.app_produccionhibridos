import { createDia, getDias } from "../../services/offline";
import { onErrorCrearDiaHoy, onErrorDias, onFinallyCrearDiaHoy, onFinallyDias, 
        onOKCrearDiaHoy, onOKDias, onStartCrearDiaHoy, onStartDias } from "./listaDiasSlice";
import dateFormat from "dateformat";

export const startingGetDias = ()=>{
    return async ( dispatch, getState )=>{
        const { auth, listaDias } = getState();
        const user = auth.user;
        const cargandoDias = listaDias.cargandoDias;

        if (cargandoDias){
            return;
        }

        dispatch( onStartDias() );
        try {
            const dias = await getDias({dni_usuario: user.dni_usuario});
            const fechaHoy = dateFormat(new Date(), 'yyyy-mm-dd');
            const existeDiaHoy = dias.find(dia => {
                return dia.fecha_dia === fechaHoy;
            });

            if (!Boolean(existeDiaHoy)){
                dispatch(startingCrearDia({fecha: fechaHoy, dias}));
            } else {
                dispatch(onOKDias(dias.map(d => {
                    return {
                        ...d, 
                        fecha_dia_formatted : dateFormat(d.fecha_dia, 'dd/mm/yyyy', true),
                        seleccionado: d.fecha_dia === fechaHoy
                    }
                })));
            }
        } catch (error) {
            console.error(error);
            dispatch(onErrorDias(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyDias() );
        }
    }
};

export const startingCrearDia = ({fecha, dias})=>{
    return async ( dispatch, getState )=>{
        const { user } = getState().auth;
        
        dispatch( onStartCrearDiaHoy() );
        try {
            const nuevoRegistro = {dni_usuario: user.dni_usuario, fecha_dia: fecha};
            const newId = await createDia(nuevoRegistro);
            const nuevoRegistroFormateado = {...nuevoRegistro, id: newId, fecha_dia_formatted : dateFormat(fecha, 'dd/mm/yyyy', true), seleccionado: true};
            const diasNuevos = [nuevoRegistroFormateado, ...dias.map(d => {
                return {
                    ...d, 
                    fecha_dia_formatted : dateFormat(d.fecha_dia, 'dd/mm/yyyy', true),
                    seleccionado: d.fecha_dia === fecha
                }
            })];
            
            dispatch(onOKCrearDiaHoy(diasNuevos));

        } catch (error) {
            console.error(error);
            dispatch(onErrorCrearDiaHoy(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyCrearDiaHoy() );
        }
    }
};