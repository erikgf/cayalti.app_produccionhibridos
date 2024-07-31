import { Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

export const DialogSincronize = ({isOpen, isLoadingServer, progress, error})=>{
    const DialogSincroText = () => {
        if (Boolean(error)){
            return <p style={{fontSize: 'small', color: 'red'}}>{error}</p>
        }

        return <p style={{fontSize: 'small'}}>
                    { isLoadingServer
                            ? `Cargando data del servidor.`
                            :   (
                                    progress >= 100 
                                        ? <b>COMPLETADO.</b>
                                        : `Insertando data en el móvil.`
                                )
                    }
                </p>
    }

    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth = 'sm'
            aria-labelledby="alert-dialogsincronize-title"
            aria-describedby="alert-dialogsincronize-description"
        >
            <DialogTitle id="alert-dialogsincronize-title">
                Sincronizando 
                <DialogSincroText />
            </DialogTitle>
            
            <DialogContent>
                {
                 isLoadingServer
                    ? <LinearProgress color={Boolean(error) ? 'error' : 'success'} />
                    : <LinearProgress  variant="determinate" value={progress} />
                }
            </DialogContent>
        </Dialog>
    )
}