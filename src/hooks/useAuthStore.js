import { useDispatch, useSelector } from "react-redux";
import { onLogout, startingLogin } from "../store/auth";
import { sha256 } from "js-sha256";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { message, status, user } = useSelector(state=>state.auth);

    const logIn = ({username, password}) => {
        const usernameCase = username.toUpperCase().trim();
        const passwordCoded = sha256(password.trim());
        dispatch( startingLogin({usuario: usernameCase, password: passwordCoded}));
    };

    const logOut = ()=>{
        dispatch( onLogout() );
    };

    return {
        //* Propiedades
        user,
        isLoggedIn  : Boolean(user),
        isLoginLoading : status === "checking",
        errorLogin: message,
        //* Métodos
        logIn, logOut
    }
}