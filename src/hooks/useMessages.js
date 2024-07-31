import { useDispatch, useSelector } from "react-redux";
import { onAdd, onRemove } from "../store/messages/messagesSlice";

export const useMessages = ()=>{
    const { messages } = useSelector(state => state.messages);
    const dispatch = useDispatch();

    const addMessage = ({text, type, duration = 5000}) => {
        const id = new Date().getTime();
        dispatch(onAdd({ id, text, type, duration}));
    };

    const removeMessage = ({id}) => {
        dispatch(onRemove(id));
    };

    return {
        messages,
        addMessage, removeMessage
    }
};