import { useDispatch, useSelector } from "react-redux";
import { startingListarPozos } from "../store/pozos/pozosThunks";

export const usePozos = () => {
    const { pozos, cargandoPozos, errorPozos } = useSelector(state => state.pozos);
    const dispatch = useDispatch();

    const onListar = () => {
        dispatch( startingListarPozos() );
    };

    return {
        pozos, cargandoPozos, errorPozos,
        onListar
    };
};