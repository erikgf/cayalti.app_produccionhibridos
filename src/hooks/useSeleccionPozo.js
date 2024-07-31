import { useDispatch, useSelector } from "react-redux";
import { startingListarPozos } from "../store/seleccionPozo";

export const useSeleccionPozo = () => {
    const { pozos, cargandoListarPozos, errorListarPozos } = useSelector(state => state.seleccionPozo);
    const dispatch = useDispatch();

    const onListarPozos = ({fecha_dia}) => {
        dispatch( startingListarPozos({fecha_dia}) );
    };

    return {
        pozos, cargandoListarPozos, errorListarPozos,
        onListarPozos
    };

};