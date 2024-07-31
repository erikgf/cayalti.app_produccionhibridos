import { useEffect, useState } from "react";
import { stores } from "../data/stores";
import { sincronizeAsk as sincronizeAskService} from "../services/online/sincronizeData";
import { registrarMasivo, clearMasivo } from "../services/offline/sincronizeData";

export const useSincronize = () => {
    const [ isLoadingSincroAsk, setIsLoadingSincroAsk ] = useState(false);
    const [ registrosTotales, setRegistrosTotales ] = useState(0);
    const [ registrosActuales, setRegistrosActuales ] = useState(0);
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    const [ error, setError] =  useState(null);
    const TIEMPO_TRAS_COMPLETAR = 2; //segundos
    const TIEMPO_MOSTRAR_ERROR = 5;

    useEffect(() => {
        let timer;
        if (registrosTotales === registrosActuales){
            timer = setTimeout(()=>{
                setIsOpenDialog(false);
            }, TIEMPO_TRAS_COMPLETAR * 1000);
        }

        return ()=>{
            if (timer){
                clearInterval(timer);
            }
        };
    }, [registrosTotales, registrosActuales]);

    useEffect(()=> {
        let timer;
        if (Boolean(error)){
            timer = setTimeout(()=>{
                setIsOpenDialog(false);
                setError(null);
            }, TIEMPO_MOSTRAR_ERROR * 1000);
        }

        return ()=>{
            if (timer){
                clearInterval(timer);
            }
        };
        
    }, [error]);

    const sincronizeAsk = ({id_empresa}) => {
        setRegistrosTotales(0);
        setRegistrosActuales(0);
        setIsOpenDialog(true);
        setIsLoadingSincroAsk(true);
        setError(null);

        sincronizeAskService({id_empresa})
            .then(response => {
                setRegistrosTotales(response?._contador);
                stores.forEach((o,i)=>{
                    if (o.sincronizeAsk === false){
                        return;
                    }
                    const data = response[o.storeName];
                    clearMasivo( { storeName: o.storeName })
                        .then(function(){
                            if (data && data.length){
                                const cantidadRegistros = data.length;
                                registrarMasivo({ data: data, storeName: o.storeName })
                                    .then(function(){
                                        setRegistrosActuales( (prev)=>{
                                            return prev + cantidadRegistros;
                                        })                                        
                                    })
                                    .catch(function(e){
                                        console.error(e);
                                    });    
                            }
                        })
                        .catch(function(e){
                            console.error("Error al limpiar store. ", e);
                        })
                });

            })
            .catch(err => {
                const { response } = err;
                const messageError = response?.data?.message;
                if (Boolean(messageError)){
                    setError(messageError);
                }

                console.error(response);
            })
            .finally(()=>{
                setIsLoadingSincroAsk(false);
            });
    };

    return {
        isLoadingSincroAsk,
        isOpenDialog,
        registrosTotales,
        registrosActuales,
        error,
        sincronizeAsk
    }
}