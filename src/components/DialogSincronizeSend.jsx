import { Button, Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

export const DialogSincronizeSend = ({isOpen, isLoadingLocal, isLoadingServer, error, setError}) =>{
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth = 'sm'
            aria-labelledby="alert-dialogsincronizesend-title"
            aria-describedby="alert-dialogsincronizesend-description"
        >
            <DialogTitle id="alert-dialogsincronizesend-title">
                Enviar Datos
                {
                    isLoadingLocal &&
                        <p style={{fontSize: 'small'}}>Procesando data en el móvil.</p>
                }
                {
                    isLoadingServer &&
                        <p style={{fontSize: 'small'}}>Enviando data al servidor.</p>
                }
                {
                    error?.length > 0 &&
                        <p style={{fontSize: 'small', color:"red"}}>{error}</p>
                }
            </DialogTitle>
            <DialogContent>
                {
                    error?.length <= 0 
                       ? <LinearProgress />
                       : <Button variant="contained" size="small" color="error" onClick={(e)=>{e.preventDefault(); setError("");}}>Cerrar</Button>
                }
            </DialogContent>
        </Dialog>
    )
}