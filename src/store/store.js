import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { cacheSlice } from './cache';
import { messagesSlice } from './messages/messagesSlice';
import { listaDiasSlice } from './listaDias';
import { seleccionPozoSlice } from './seleccionPozo';
import { pozosSlice } from './pozos';
import { zonasSlice } from './zonas';

export const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        cache: cacheSlice.reducer,
        messages: messagesSlice.reducer,
        listaDias: listaDiasSlice.reducer,
        seleccionPozo : seleccionPozoSlice.reducer,
        pozos: pozosSlice.reducer,
        zonas: zonasSlice.reducer
    }
});