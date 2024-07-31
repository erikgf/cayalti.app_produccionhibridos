import {useState, cloneElement} from 'react';
import { IconButton,AppBar,Toolbar,Typography,CssBaseline,useScrollTrigger, Button, Box, Icon } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MdMenu as MenuIcon } from 'react-icons/md';
import { Navbar } from './Navbar';

export const Appbar=(props)=> {
      const [state, setState] = useState(false);
      const { actions } =  props;

      function ElevationScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
          disableHysteresis: true,
          threshold: 0,
          target: window ? window() : undefined,
        });
      
        return cloneElement(children, {
          elevation: trigger ? 4 : 0,
        });
      }

      const toggleDrawer =(open) =>(event) => {
          if (event.type === 'keydown' &&((event).key === 'Tab' ||(event).key === 'Shift')) {
            return;
          }    
          setState(open);
      };

      const renderActions = ()=>{
        if (!actions){
          return false;
        }

        if (actions.length === 1){
          const [onlyOneAction] = actions;
          return <LoadingButton loading={onlyOneAction?.loading || false} disabled = {onlyOneAction?.disabled || false} variant={onlyOneAction?.variant || "contained"} color={onlyOneAction?.color || "primary"} endIcon={<Icon>{onlyOneAction?.icon}</Icon>} onClick={onlyOneAction?.onClick || (()=>{})}>{onlyOneAction?.title || "No Title"}</LoadingButton>
        }

        return false;
      };
        
      return (
        <Box  sx={{marginTop: 8}} >
          <CssBaseline />
          <ElevationScroll {...props} >
            <AppBar sx={{ flexGrow: 1, display:props.header, background : '#2e7d32'}}>
              <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}>
                <MenuIcon/>           
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.nombre} 
              </Typography>
                { renderActions() }
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Navbar state={state} close={toggleDrawer(false)} />
        </Box>
      );
}
