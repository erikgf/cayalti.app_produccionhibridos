import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Inicio, Login, Registro, SeleccionPozo } from './pages';
import { useAppUtility, useAuthStore } from './hooks';
import './App.css'
import { Messages, Navbar } from './components';

function App() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { checkUpdate } = useAppUtility();

  useEffect(() => {
    /*
    checkPermissions({
      requiredPermissions: ["ACCESS_COARSE_LOCATION","ACCESS_FINE_LOCATION","CAMERA"]
    });
    */
    checkUpdate();
  }, []);

  useEffect(()=>{
    const fnBackButton = (e) => {
      const hash = window.location.hash;
      if (hash === "#/" || hash === "#" || hash == "#/login"){
        window.navigator.app.exitApp();
        return false;
      }

      navigate(-1);
    };
    
    document.addEventListener('backbutton', fnBackButton, false);
    return ()=>{
      document.removeEventListener("backbutton", fnBackButton, false);
    }
  }, []);

  return (   
      <>
        { user && <Navbar />}
        <Routes >
          <Route path="/" element={<Login/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/seleccion-pozo/:fechaDia" element={<SeleccionPozo/>}/>
          <Route path="/registro/:fechaDia/:idRegistroDetalle" element={<Registro/>}/>
          {/*
          <Route path="/inicio" element={<Inicio/>}/>
            <Route path="/requerimiento/:id" element={<Requerimiento/>}/>
            <Route path="/despachar" element={<Despacho/>}/>
          <Route path="/toma-inventarios" element={<TomaInventarios/>}/>
          <Route path="/toma-inventarios-registro/:id" element={<TomaInventariosRegistro/>}/>
          */}
        </Routes>    

        <Messages />
      </> 
  )
}

export default App
