import {
    Button,Dialog,DialogActions,DialogTitle} from '@mui/material'
import React from 'react'


export const Dialogs = (props) => {
    return (
        <Dialog open={
                props.open
            }
            onClose={
                props.cerraDialog
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {props.mensaje} </DialogTitle>
            <DialogActions>
                <Button 
                sx={{display:props.display}}
                onClick={
                    props.cerrar
                }>Cancelar</Button>
                <Button onClick={
                        props.aceptar
                    }
                    autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

