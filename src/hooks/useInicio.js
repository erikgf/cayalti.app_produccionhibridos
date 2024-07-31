import { useDispatch, useSelector } from "react-redux";
import { startingGetDias } from "../store/listaDias/listaDiasThunks";

export const useInicio = () => {
    const { dias, cargandoDias, errorDias } = useSelector(state => state.listaDias);
    const dispatch = useDispatch();

    const onListarDias = () => {
        dispatch( startingGetDias() );
    };

    return {
        dias, cargandoDias, errorDias,
        onListarDias
    };
};