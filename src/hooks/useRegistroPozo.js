import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, modificandoRegistroPozo, startingActualizarRegistroPozo, startingLeerPozo, startingRegistrarRegistroPozo, startingEliminarRegistroPozo } from "../store/seleccionPozo";
import { onSetRegistrarPozoVacio } from "../store/seleccionPozo";
import dateFormat from "dateformat";

export const useRegistroPozo = () => {
    const { submitOK, pozo, cargandoLeerPozo, errorLeerPozo, cargandoRegistrarPozo, errorRegistrarPozo } = useSelector(state => state.seleccionPozo);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (Boolean(errorRegistrarPozo)){
            let timer = setTimeout(()=>{
                dispatch( clearErrors() );
                timer = null;
            }, 5000);
            return ()=>{
                dispatch( clearErrors() );
                if (timer){
                    clearTimeout(timer);
                }
            };
        }
    }, [errorRegistrarPozo]);

    const onLeerPozo = ({ id }) => {
        dispatch( startingLeerPozo({ id }) );
    };

    const onRegistrarPozo = ({ fecha_dia, editando }) => {
        if (pozo?.id === null){
            const hora_inicial = dateFormat("HH:MM");
            dispatch( startingRegistrarRegistroPozo({...pozo, fecha_dia, hora_inicial}))
        } else {
            if (!editando){
                const hora_final = dateFormat("HH:MM");
                dispatch( startingActualizarRegistroPozo({...pozo, fecha_dia, hora_final}));
                return;
            }

            dispatch( startingActualizarRegistroPozo({...pozo, fecha_dia}));
        }
    };

    const onResetRegistrarPozo = () => {
        dispatch( onSetRegistrarPozoVacio());
    };

    const onModificandoRegistroPozo = (key, value) => {
        dispatch( modificandoRegistroPozo({key, value}) );
    };

    const onEliminarRegistroPozo = () => {
        dispatch( startingEliminarRegistroPozo({id: pozo?.id}) );
    };

    return {
        submitOK, pozo, cargandoLeerPozo, errorLeerPozo, cargandoRegistrarPozo, errorRegistrarPozo,
        onLeerPozo, onRegistrarPozo, onResetRegistrarPozo, onModificandoRegistroPozo, onEliminarRegistroPozo
    };
};