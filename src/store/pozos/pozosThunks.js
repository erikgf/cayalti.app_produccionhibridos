import { getPozos } from "../../services/offline";
import { onErrorListarPozo, onFinallyListarPozo, onOKListarPozo, onStartListarPozo } from "./pozosSlice";

export const startingListarPozos = ()=>{
    return async ( dispatch )=>{
        dispatch( onStartListarPozo() );
        try {
            const registros = await getPozos();
            dispatch( onOKListarPozo(registros) );
        } catch (error) {
            console.error(error);
            dispatch(onErrorListarPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyListarPozo() );
        }
    }
};