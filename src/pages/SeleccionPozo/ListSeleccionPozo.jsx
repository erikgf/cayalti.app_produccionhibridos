import { Chip, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { BlockVacio } from "../../components";
import { MdCheckCircle as CheckIcon } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const CheckIconVerde = () => {
    return <CheckIcon style={{color: "green", fontSize: 14}}/>
};

const ListItemTextPrimary = ({descripcionPozo, enviadoInicial, enviadoFinal}) =>{
    return <Typography>
                { Boolean(enviadoInicial) && <CheckIconVerde />}
                { Boolean(enviadoFinal) && <CheckIconVerde />}
                {descripcionPozo}
            </Typography>
};

export const ListSeleccionPozo = ({cargandoListarPozos = false, pozos = [], fechaDia}) => {
    const navigate = useNavigate();
    const ListaPozos = () => {
        if (cargandoListarPozos){
            return <LinearProgress />;
        }

        if (!pozos.length){
            return <BlockVacio />
        }

        return pozos?.map(pozo => {
                const pozoEstaCompleto = Boolean(pozo?.valor_final) && Boolean(pozo?.valor_inicial);
                const color = pozoEstaCompleto ? 'success' : 'error';
                const rotulo = pozoEstaCompleto ? 'COMPLETO' : 'INCOMPLETO';
                return <ListItem key ={pozo.id} disablePadding>
                        <ListItemButton onClick={()=>{
                            navigate(`/registro/${fechaDia}/${pozo.id}`)
                        }}>
                            <ListItemText primary={<ListItemTextPrimary descripcionPozo={pozo.descripcion_pozo} enviadoInicial={pozo.enviado_inicial} enviadoFinal={pozo.enviado_final}  />}/>
                            <ListItemIcon>
                                <Chip label={rotulo} size="small" color={color} variant="contained" />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
            });
    };

    return  <List sx={{maxHeight: 'calc(100vh - 300px)', overflow:'scroll'}}>
                <ListaPozos />
            </List>
};