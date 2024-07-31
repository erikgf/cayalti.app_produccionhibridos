import { useEffect } from "react";
import { Container, LinearProgress, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlockVacio } from "../../components";
import { useInicio } from "../../hooks/useInicio";
import { usePozos } from "../../hooks/usePozos";
import { useZonas } from "../../hooks/useZonas";

export const Inicio = () => {
    const navigate = useNavigate();
    const { onListar : onListarPozos } = usePozos();
    const { onListar : onListarZonas } = useZonas();
    const { dias, cargandoDias, errorDias, 
            onListarDias } = useInicio();

    useEffect(()=> {
        onListarDias();
        onListarZonas();
        onListarPozos();
    }, []);

    const ListaDias = () => {
        if (cargandoDias){
            return <LinearProgress />;
        }

        if (!dias.length){
            return <BlockVacio />
        }

        return dias?.map(dia => {
            return  <ListItem key={dia.id} disablePadding  sx={ dia.seleccionado ? {backgroundColor: '#2e7d32', color: 'white'} : {}} >
                        <ListItemButton onClick={()=>{
                            navigate(`/seleccion-pozo/${dia.fecha_dia}`)
                        }}>
                            <ListItemText primary={`Día ${dia.fecha_dia_formatted}`} />
                        </ListItemButton>
                    </ListItem>
        })
    };

    return <Container maxWidth="xs" sx={{mt: 2}}>
            <Typography variant="subtitle2" >Lista Días </Typography>
            <List>
                <ListaDias />
            </List>
    </Container>
}