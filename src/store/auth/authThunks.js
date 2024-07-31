import { logIn as loginService } from "../../services/offline";
import { onChecking, onLogin, onLogout, onErrorLogin } from "./authSlice";

export const startingLogin = ({usuario, password})=>{
    return async ( dispatch, getState)=>{
        dispatch( onChecking() );
        try {
            const response = await loginService({usuario});

            if (!response.length){
                throw("No existe este usuario");
            }

            const usuarioFound  = response[0];
            if (usuarioFound.clave !== password){
                throw("Clave incorrecta");
            }

            dispatch( onLogin({
                dni_usuario: usuarioFound.dni_usuario,
                usuario : usuarioFound.usuario,
                nombres_apellidos : usuarioFound.nombres_apellidos
            }));

        } catch (error) {
            console.error(error);
            dispatch(onErrorLogin(typeof error === 'string' ? error : JSON.stringify(error)));
            setTimeout(()=>{
                dispatch(onLogout());
            }, 3000);
        }
    }
};