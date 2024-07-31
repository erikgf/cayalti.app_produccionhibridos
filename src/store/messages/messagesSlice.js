import { createSlice } from "@reduxjs/toolkit";

//message : {integer id, string text, string type, integer duration = 5000}
const defaultInitialState = {
    messages: []
};

export const messagesSlice = createSlice({
    name: 'messages', 
    initialState: defaultInitialState,
    reducers: {
        onAdd : ( state, {payload : newMessage}) => {
            state.messages.push(newMessage);
        },
        onRemove : ( state, { payload : id} ) => {
            state.messages = state.messages.filter(m => m.id != id);
        },
        clearAll : (state)=>{
            state.messages = [];
        }
    }
});

export const {
    onAdd,
    onRemove,
    clearAll
} = messagesSlice.actions;