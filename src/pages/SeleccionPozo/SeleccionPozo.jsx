import { memo, useEffect, useMemo } from "react";
import { Button, Container, Typography } from "@mui/material";
import { MdAdd as AddIcon, MdUpload as SendIcon } from 'react-icons/md';
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { useSeleccionPozo } from "../../hooks/useSeleccionPozo";
import { useEnviar } from "../../hooks";
import { ListSeleccionPozo } from "./ListSeleccionPozo";

const ListSeleccionPozoMemo = memo(ListSeleccionPozo);

export const SeleccionPozo = () => {
    const navigate = useNavigate();
    const { fechaDia } = useParams();
    const { cargandoListarPozos, pozos, onListarPozos } = useSeleccionPozo();
    const cargandoListarPozosMemo = useMemo(()=>{
        return cargandoListarPozos;
    },[cargandoListarPozos]);
    const pozosMemo = useMemo(()=>{
        return pozos;
    }, [pozos]);

    const fechaDiaFormateada = dateFormat(fechaDia, 'dd/mm/yyyy', true);
    const { onEnviar } = useEnviar();

    useEffect(()=>{
        onListarPozos({fecha_dia: fechaDia});
    }, []);

    return  <Container maxWidth="xs" sx={{mt: 2}}>
                <Typography variant="h5" mb={2}>Día: <strong>{fechaDiaFormateada}</strong></Typography>
                <Button 
                    sx = {{mb: 2}}
                    variant="contained" 
                    color="success" 
                    fullWidth
                    startIcon={<AddIcon/>}
                    onClick={()=>{
                        navigate(`/registro/${fechaDia}/0`)
                    }}>
                        ESCOGER POZO
                </Button>
                <Typography variant="subtitle2">Lista de Pozos </Typography>
                <ListSeleccionPozoMemo cargandoListarPozos = {cargandoListarPozosMemo} pozos = {pozosMemo}  fechaDia={fechaDia}/>
                <Button
                    sx= {{
                            bottom: '10px',
                            width: 'calc(100% - 32px)',
                            maxWidth: '400px',
                            minHeight: '75px',
                            fontSize: '1.55em',
                            position: "absolute"
                        }}
                    variant="contained" 
                    color={'info'} 
                    size="large"
                    startIcon={<SendIcon/>}
                    onClick={(e)=>{
                        e.preventDefault();
                        onEnviar({fecha_dia: fechaDia});
                    }}
                    >ENVIAR</Button>
            </Container>
}