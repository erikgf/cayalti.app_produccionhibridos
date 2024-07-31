import { getZonas } from "../../services/offline";
import { onErrorListarZona, onFinallyListarZona, onOKListarZona, onStartListarZona } from "./zonasSlice";

export const startingListarZonas = () =>{
    return async ( dispatch )=>{
        dispatch( onStartListarZona() );
        try {
            const registros = await getZonas();
            dispatch( onOKListarZona(registros));
        } catch (error) {
            console.error(error);
            dispatch(onErrorListarZona(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyListarZona() );
        }
    }
};