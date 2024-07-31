import { Alert, Snackbar } from "@mui/material";
import { useMessages } from "../hooks/useMessages";

export const Messages = () => {
    const { messages, removeMessage} = useMessages();

    return messages?.map( message => {
        return <Snackbar
                    key = {message.id}
                    open={true}
                    autoHideDuration={message.duration}
                    onClose={()=>{
                        removeMessage({id: message.id})
                    }}
                >
                    <Alert variant="filled" severity={message.type} sx={{ width: '100%' }} onClose={()=>{
                            removeMessage({id: message.id})
                        }}>
                        {message.text}
                    </Alert>
                </Snackbar>
    })
};