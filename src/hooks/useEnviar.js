import { useState } from "react"
import { marcarRegistros, obtenerRegistrosEnvio } from "../services/offline";
import { useAppUtility } from "./useAppUtility";
import dateFormat from "dateformat";
import { useAuthStore } from "./useAuthStore";
import { sincronizeSend } from "../services/online/sincronizeData";
import { useCacheStore } from "./useCacheStore";

export const useEnviar = () => {
    const [ cargandoLocal, setCargandoLocal] = useState(false);
    const [ errorLocal, setErrorLocal ] = useState(null);
    const [ cargando, setCargando ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    const { getDevice, alertar } = useAppUtility();
    const { user } = useAuthStore();
    const { empresa } = useCacheStore();

    const onEnviar = async ({fecha_dia}) => {
        try {
            setCargandoLocal(true);
            const data = await obtenerRegistrosEnvio({fecha_dia});
            const dataProcesada = procesarParaEnvio(data.filter((item)=>{
                if (item.enviado_inicial === 0 && item.enviado_final === 0){
                    return true;
                }

                if (item.enviado_inicial === 1 && item.enviado_final === 0 && Boolean(item?.valor_final)){
                    return true;
                }

                return false;
            }));

            if (!dataProcesada.length){
                alertar({txtMessage: "No hay registros para enviar."});
                return;
            }

            const idMovil = getDevice();
            const fechaHoraMovil = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
            const cabecera = {
                id_empresa: empresa,
                id_usuario_envio: user.dni_usuario,
                fecha_hora_movil : fechaHoraMovil,
                id_movil: idMovil,
                fecha_dia,
                detalle: dataProcesada
            };

            await sincronizeSend(cabecera);
            await marcarRegistros({fecha_dia});

            alertar({txtMessage: "Registros enviados correctamente."});
        } catch (error) {
            console.error(error);
            setErrorLocal(error);
        } finally {
            setCargandoLocal(false);
        }
    };

    const procesarParaEnvio = (data) => {
        return data.map(item => {
            const nuevoItem = {
                id: item.id,
                id_pozo : item.id_pozo,
                valor_inicial: item.valor_inicial,
                hora_inicial: item.hora_inicial
            };

            if (Boolean(item?.valor_final)){
                return {
                    ...nuevoItem,
                    valor_final: item.valor_final,
                    hora_final: item.hora_final
                };
            }

            return nuevoItem;
        });
    };

    const actualizarEnviados = () => {

    };

    return {
        cargandoEnviar: cargando, errorEnviar: error, isOpenDialog,
        onEnviar
    };
}