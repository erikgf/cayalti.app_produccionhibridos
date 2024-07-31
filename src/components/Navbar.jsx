import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Menu, MenuItem, Typography, IconButton, Avatar} from '@mui/material';
import {MdMoreVert as MoreIcon, MdArrowBack as ArrowBackIcon} from 'react-icons/md';

import LogoMiniCayalti from '../assets/logo-mini-001.jpg';
import LogoMiniYarabamba from '../assets/logo-mini-002.png';
import { navigationData } from '../data/navigationData'
import { useAuthStore, useCacheStore } from "../hooks";

export const Navbar = ()=>{
    const [ navBarInfo, setNavBarInfo] = useState({
      interfaceName : '',
      canGoBack : false
    });
    
    const { user, logOut } =  useAuthStore();
    const { empresa } =  useCacheStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      const pathname = location.pathname.split("/")[1];
      const { interfaceName, canGoBack} = navigationData.find((e)=> e.pathname === pathname);

      setNavBarInfo({
        interfaceName: interfaceName,
        canGoBack : canGoBack
      });

    }, [location]);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const cerrarSesion = () => {
      handleClose();
      logOut();
      navigate("/",  {replace: true});
    };

    const goBack = () => {
      if (!navBarInfo.canGoBack)
        return;
      navigate(-1);
    };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick = { goBack }
              >
                { navBarInfo.canGoBack && <ArrowBackIcon />}
                <Avatar sx={{ width: 32, height: 32 }} src={ empresa === "001" ? LogoMiniCayalti : LogoMiniYarabamba } />
            </IconButton>
            <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
              {navBarInfo.interfaceName}
            </Typography>
            {user && (
              <div>
                <IconButton
                  size="large"
                  aria-label="Menú"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem dense divider>{ user.nombres_apellidos}</MenuItem>
                  { /* <MenuItem dense onClick={handleClose}><strong>SINCRONIZAR</strong></MenuItem> */}
                  <MenuItem dense onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    )
}