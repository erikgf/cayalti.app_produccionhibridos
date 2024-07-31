import { useEffect, useState } from "react";
import { Alert, Button, Container, Grid, MenuItem, Stack, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import { usePozos } from "../../hooks/usePozos";
import { useZonas } from "../../hooks/useZonas";
import { useRegistroPozo } from "../../hooks/useRegistroPozo";
import { useMessages } from "../../hooks/useMessages";
import { useAppUtility } from "../../hooks";

const styleReadOnly= {backgroundColor: 'gainsboro', color:'#414141',fontSize:'1.15em'};

export const Registro = () => {
    const { fechaDia, idRegistroDetalle } = useParams();
    const navigate = useNavigate();
    const { pozos } = usePozos();
    const { zonas } = useZonas();
    const { addMessage } = useMessages();
    const [ zonaSeleccionada, setZonaSeleccionada ] = useState("");
    const [ editando, setEditando] = useState(false);
    const { submitOK, pozo, cargandoLeerPozo, errorLeerPozo, cargandoRegistrarPozo, errorRegistrarPozo,
            onLeerPozo, onRegistrarPozo, onResetRegistrarPozo,
            onModificandoRegistroPozo, onEliminarRegistroPozo } = useRegistroPozo();
    const { confirmar } = useAppUtility();

    const registrandoNuevo = pozo?.id === null;
    const registroCompleto = Boolean(pozo?.valor_total) && Boolean(pozo?.horas_total);
    const registrandoFinal = !registrandoNuevo && !registroCompleto;

    useEffect(()=>{
        if (submitOK > 0){
            setEditando(false);
            addMessage({
                text: 'Registrado correctamente.',
                type: 'success'
            });
        }
    }, [submitOK]);

    useEffect(()=> {
        if (idRegistroDetalle == '0'){
            return ;
        }

        onLeerPozo({id: idRegistroDetalle});
    }, [idRegistroDetalle]);

    useEffect(()=>{
        return ()=>{
            onResetRegistrarPozo();
            setEditando(false);
        }
    }, []);

    const handleEliminar = (e)=>{
        e.preventDefault(); 
        confirmar({txtMessage: "¿Está seguro que desea eliminar?", onConfirm: ()=>{
            onEliminarRegistroPozo();
            navigate(-1);
            addMessage({
                text: 'Eliminado correctamente.',
                type: 'success'
            });
        }})
    };

    return <Container  maxWidth="xs" sx={{mt: 2}} component={"form"} onSubmit={(e)=>{
        e.preventDefault();
        onRegistrarPozo({
            fecha_dia: fechaDia,
            editando
        });
    }}>
        {
            cargandoLeerPozo && 'Cargando...'
        }
        {
            Boolean(errorRegistrarPozo) &&
                <Alert  variant="filled" severity="error">{errorRegistrarPozo}</Alert>
        }
        {
            registrandoNuevo 
                ?   <>
                        <Grid container mt={2} mb={2}>
                            <Grid item xs>
                                <TextField
                                    value = { zonaSeleccionada }
                                    onChange={(e)=>{
                                        setZonaSeleccionada(e.target.value);
                                    }}
                                    label="Zona"
                                    size = "small"
                                    select
                                    fullWidth
                                    >
                                    <MenuItem value="" disabled>
                                        <em>Seleccionar Zona</em>
                                    </MenuItem>
                                    {
                                        zonas?.map(zona => {
                                            return <MenuItem key={zona.id} value={zona.id_zona}>{zona.descripcion}</MenuItem>;
                                        })
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container mt={2} mb={2}>
                            <Grid item xs>
                                <TextField
                                    value = {pozo?.id_pozo}
                                    label="Pozo"
                                    size = "small"
                                    select
                                    fullWidth
                                    required = { registrandoNuevo }
                                    disabled = { !registrandoNuevo }
                                    onChange = {(e)=> {
                                        onModificandoRegistroPozo("id_pozo", e.target.value);
                                    }}
                                    >
                                    <MenuItem value="" disabled>
                                        <em>Seleccionar Pozo</em>
                                    </MenuItem>
                                    {
                                        pozos?.filter(pozo => {
                                                return pozo.id_zona == zonaSeleccionada;
                                            })
                                            ?.map(pozo => {
                                                return <MenuItem key={pozo.id} value={pozo.id_pozo}>{pozo.id_consumidor} | {pozo.descripcion}</MenuItem>;
                                            })
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                    </>
                :   <Grid container mt={2} mb={2}>
                        <Grid item xs>
                            <TextField
                                value = {pozo?.descripcion_pozo}
                                label="Pozo"
                                size = "small"
                                fullWidth
                                InputProps={{
                                    readOnly: true, 
                                    style: styleReadOnly
                                }}/>
                        </Grid>
                    </Grid>
        }

        <Grid container mb={2} spacing={2}>
            <Grid item xs={6}>
                <TextField
                    value = { pozo?.valor_inicial}
                    label="Valor Inicial"
                    name="valor_inicial"
                    type="number"
                    size = "small"
                    fullWidth
                    required
                    InputProps={{
                        readOnly: !(editando || registrandoNuevo),
                        style: !(editando || registrandoNuevo) ? styleReadOnly : {}
                    }}
                    onChange={(e)=> {
                        onModificandoRegistroPozo("valor_inicial", e.target.value); 
                    }}
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value = { pozo?.hora_inicial}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        readOnly: true, style: styleReadOnly
                    }}
                    type="time"
                    label="Hora Inicial"
                    name="hora_final"
                    size = "small"
                    fullWidth
                    />
            </Grid>
        </Grid>
        {
            !registrandoNuevo && 
                <Grid container mb={2} spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            value = { pozo?.valor_final}
                            type="number"
                            label="Valor Final"
                            name="valor_final"
                            size = "small"
                            fullWidth
                            required
                            InputProps={{
                                readOnly: !(editando || registrandoFinal),
                                style: !(editando || registrandoFinal) ? styleReadOnly : {}
                            }}
                            onChange={(e)=> {
                                onModificandoRegistroPozo("valor_final", e.target.value); 
                            }}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value = { pozo?.hora_final}
                            type="time"
                            label="Hora Final"
                            name="hora_final"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size = "small"
                            fullWidth
                            InputProps={{
                                readOnly: true, style: styleReadOnly
                            }}
                            />
                    </Grid>
                </Grid>
        }
        {
            registroCompleto &&
                <Grid container spacing={2} mb={2}>
                    <Grid item xs>
                        <TextField 
                            label="Total Cantidad"
                            size = "small"
                            inputProps={{style: {textAlign:'center'}}}
                            InputProps={{readOnly: true, style: {backgroundColor: 'gainsboro', color:'#7e7979',fontSize:'1.15em'}}}
                            value = { pozo?.valor_total}
                            />
                    </Grid>
                    <Grid item xs>
                        <TextField 
                            label="Total Horas"
                            inputProps={{style: {textAlign:'center'}}}
                            InputProps={{readOnly: true, style: {backgroundColor: 'gainsboro', color:'#7e7979', textAlign: 'center', fontSize: '1.15em'}}}
                            value = { pozo?.horas_total}
                            size = "small"
                            />
                    </Grid>
                </Grid>
        }
        
        {
            (!registroCompleto || editando) &&
                <Button type="submit" fullWidth variant="contained" size="large">GUARDAR</Button>
        }
        {
            (registroCompleto && !editando) && 
                <Stack spacing={1}>
                    <Button type="button" fullWidth color="warning" variant="contained" size="large" onClick={(e)=>{e.preventDefault(); setEditando(true);}}>EDITAR</Button>
                    <Button type="button" fullWidth color="error" variant="contained" size="large" onClick={handleEliminar}>ELIMINAR</Button>
                </Stack>
        }
        
    </Container>
}