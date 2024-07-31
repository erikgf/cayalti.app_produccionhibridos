import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../data";
import { MenuItem, Container, Typography, Box, Avatar, TextField, Button,  Alert  } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {MdLogin as LoginIcon} from 'react-icons/md';
import LogoCayalti from '../../assets/logo-001.jpg';
import LogoYarabamba from '../../assets/logo-002.png';
import { DialogSincronize } from "../../components";
import {useAppUtility, useAuthStore, useCacheStore, useSincronize} from "../../hooks";

const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;
const nameApp = import.meta.env.VITE_APP_NAME;
const SESSION_NAME_TP = `${SESSION_NAME}_TP`;
const isDevMode = window.localStorage.getItem(SESSION_NAME_TP) == '1';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/inicio";
    const {empresa, asignarEmpresa} = useCacheStore();
    const { isLoggedIn, isLoginLoading, errorLogin, logIn } = useAuthStore();
    const { isOpenDialog, isLoadingSincroAsk, registrosTotales, registrosActuales, error, sincronizeAsk } = useSincronize();
    const [cantidadClicks, setCantidadClicks] = useState(0);
    const { getAppVersion } = useAppUtility();
    const progress =  registrosActuales / registrosTotales * 100;

    useEffect(() => {
      if (isLoggedIn) {
         navigate(from,  {replace: true});
      }
    }, [isLoggedIn])

    const handleSubmit = (e) => {
      e.preventDefault();
      logIn({
        username, 
        password
      });
    };

    const sincronizar = (e) => {
      e.preventDefault();
      sincronizeAsk({id_empresa: empresa});
    };

    const swapToDev = ()=>{
      setCantidadClicks(cantidadClicks + 1);
      if ( cantidadClicks >= 5){
        if (window.localStorage.getItem(SESSION_NAME_TP)){
          window.localStorage.removeItem(SESSION_NAME_TP);
          alert("Modo DEV desactivado. Reiniciar APP");
        } else {
          window.localStorage.setItem(SESSION_NAME_TP, '1');
          alert("Modo DEV activado. Reiniciar APP");
        }
      }
    }

    return (  
       <Container maxWidth="xs">
          <Button variant="text" size = "small" color="secondary" sx={{position: "absolute", top: '12px', right:'12px', fontWeight: "bold"}} onClick={sincronizar}>SINCRONIZAR</Button>
          <Box
            sx={{
              marginTop: 8,
              paddingLeft: 3,
              paddingRight: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Typography component="h1" variant="h5" sx={isDevMode == '1' ? {color: 'red'}: {}}>
              <strong> { nameApp }</strong>
            </Typography>
            
            <Avatar onClick={()=>swapToDev()} sx={{ m: 1, width: 192, height : 192}} src={ empresa === '001' ? LogoCayalti : LogoYarabamba } />

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  value={empresa}
                  select
                  label="Empresa"
                  size = "small"
                  fullWidth
                  onChange={(e)=>{ asignarEmpresa(e.target.value); }}
                >
                  {
                    EMPRESAS.map((empresa)=>{
                      return <MenuItem key={empresa.id} value={empresa.id}>{empresa.name}</MenuItem>
                    })
                  }
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                value = {username}
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                size="small"
                onChange = {(e)=>{
                  setUsername(e.currentTarget.value);
                }}
              />
              <TextField
                margin="normal"
                value = {password}
                required
                fullWidth
                name="password"
                label="Clave"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                onChange = {(e)=>{
                  setPassword(e.currentTarget.value);
                }}
              />
              {
                (errorLogin !== "")
                  ? <Alert variant="filled" severity="error">{errorLogin}</Alert>
                  : <LoadingButton
                    loading = {isLoginLoading}
                    text = "INICIANDO..."
                    fullWidth
                    type="submit"
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    INGRESAR
                  </LoadingButton>
              }
              <div style={{fontSize: 'small', textAlign: 'center'}}>Versión {getAppVersion()}</div>
            </Box>
          </Box>
          <DialogSincronize isOpen={isOpenDialog} isLoadingServer={isLoadingSincroAsk} progress={ progress } error={error}/>
       </Container> 
    );
}