import { useDispatch, useSelector } from "react-redux";
import { startingListarZonas } from "../store/zonas/zonasThunks";

export const useZonas = () => {
    const { zonas, cargandoZonas, errorZonas } = useSelector(state => state.zonas);
    const dispatch = useDispatch();

    const onListar = () => {
        dispatch( startingListarZonas() );
    };

    return {
        zonas, cargandoZonas, errorZonas,
        onListar
    };
};