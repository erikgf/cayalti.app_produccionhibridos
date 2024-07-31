import { createRegistro, deleteRegistro, getRegistro, getRegistros, obtenerRegistrosPorPozo, updateRegistro } from "../../services/offline";
import { onErrorEliminarRegistroPozo, onErrorLeerPozo, onErrorListarPozo, onErrorRegistrarPozo, onFinallyEliminarRegistroPozo, onFinallyLeerPozo, onFinallyListarPozo, onFinallyRegistrarPozo, onOKActualizarPozo, onOKEliminarRegistroPozo, onOKLeerPozo, onOKListarPozo, onOKRegistrarPozo, onStartEliminarRegistroPozo, onStartLeerPozo, onStartListarPozo, onStartRegistrarPozo } from "./seleccionPozoSlice";

export const startingListarPozos = ({fecha_dia})=>{
    return async ( dispatch )=>{
        dispatch( onStartListarPozo() );

        try {
            const registros = await getRegistros({fecha_dia});
            dispatch( onOKListarPozo(registros) );
        } catch (error) {
            console.error(error);
            dispatch(onErrorListarPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyListarPozo() );
        }
    }
};

export const startingLeerPozo = ({id})=>{
    return async ( dispatch )=>{
        dispatch( onStartLeerPozo() );

        try {
            const registro = await getRegistro({id});
            dispatch( onOKLeerPozo(registro) );
        } catch (error) {
            console.error(error);
            dispatch(onErrorLeerPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyLeerPozo() );
        }
    }
};

export const startingRegistrarRegistroPozo = ({ fecha_dia, id_pozo, valor_inicial, hora_inicial })=>{
    return async ( dispatch, getState )=>{
        const { user } = getState().auth;
        const { pozos } = getState().pozos;
        
        dispatch( onStartRegistrarPozo() );
        try {
            const pozoSeleccionado = pozos.find(p => p.id_pozo === id_pozo);

            if (!Boolean(pozoSeleccionado)){
                throw `No existe el pozo seleccionado en la base de datos local.`;
            }

            const pozosRepetidos = await obtenerRegistrosPorPozo({ fecha_dia, id_pozo});
            if (pozosRepetidos.length >  0){
                throw `Ya existe el pozo ${pozoSeleccionado.descripcion} registrado el día de hoy.`;
            }

            const nuevoRegistro =   {
                                        fecha_dia, dni_usuario: user.dni_usuario, 
                                        id_pozo, descripcion_pozo : pozoSeleccionado?.descripcion, 
                                        valor_inicial, hora_inicial,
                                        valor_final: '', hora_final: '',
                                        enviado_inicial: 0, enviado_final: 0
                                    };
            const newId = await createRegistro(nuevoRegistro);
            dispatch(onOKRegistrarPozo({...nuevoRegistro, id: newId}));

        } catch (error) {
            console.error(error);
            dispatch(onErrorRegistrarPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyRegistrarPozo() );
        }
    }
};

const calcularDiferenciaEntreTiempos = ({hora_inicial, hora_final}) => {
    const startTime = new Date(hora_inicial); 
    const endTime = new Date(hora_final);
    const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    const resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes; //Horas
}

const convertirMinutosAHorasHexagesimal = (minutos) => {
    const horas = minutos / 60;
    const horasEnteras = parseInt(horas);
    const decimalesHorasSobrantes = horas - horasEnteras;
    const minutosSobrantes = Math.round(decimalesHorasSobrantes * 60);

    return `${horasEnteras > 10 ? horasEnteras : `0${horasEnteras}` }:${minutosSobrantes > 10 ? minutosSobrantes : `0${minutosSobrantes}`}`;
};

export const startingActualizarRegistroPozo = ({ id, fecha_dia, valor_inicial, hora_inicial, valor_final, hora_final })=>{
    return async ( dispatch )=>{
        dispatch( onStartRegistrarPozo() );
        try {
            if ( hora_inicial > hora_final ){
                throw `Se está ingresando una hora inicial mayor a la final`;
            }
            //Se calculan los valores pendientes.
            const horas_total = convertirMinutosAHorasHexagesimal(calcularDiferenciaEntreTiempos({hora_inicial: `${fecha_dia} ${hora_inicial}`, hora_final: `${fecha_dia} ${hora_final}`}));
            const valor_total = parseFloat(parseFloat(valor_final) - parseFloat(valor_inicial)).toFixed(2);
            const editadoRegistro = { valor_inicial, hora_inicial, valor_final, hora_final, horas_total, valor_total };
            await updateRegistro(id, editadoRegistro);
            dispatch(onOKActualizarPozo(editadoRegistro));
        } catch (error) {
            console.error(error);
            dispatch(onErrorRegistrarPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyRegistrarPozo() );
        }
    }
};

export const startingEliminarRegistroPozo = ({ id }) => {
    return async ( dispatch )=>{
        dispatch( onStartEliminarRegistroPozo() );
        try {
            await deleteRegistro(id);
            dispatch(onOKEliminarRegistroPozo(id));
        } catch (error) {
            console.error(error);
            dispatch(onErrorEliminarRegistroPozo(typeof error === 'string' ? error : JSON.stringify(error)));
        } finally {
            dispatch( onFinallyEliminarRegistroPozo() );
        }
    }
}