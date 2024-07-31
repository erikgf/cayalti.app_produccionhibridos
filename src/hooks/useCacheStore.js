import { useDispatch, useSelector } from "react-redux";
import { actualizarEmpresa } from "../store/cache";

export const  useCacheStore = () => {
    const dispatch = useDispatch();
    const { empresa } = useSelector(state=>state.cache);

    const asignarEmpresa = (localEmpresa)=>{
        dispatch( actualizarEmpresa(localEmpresa) );
    };

    return {
        //* Propiedades
        empresa,
        //* Funciones
        asignarEmpresa
    }
}