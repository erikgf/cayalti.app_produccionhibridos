import { localDataBase as db } from '../../data/localDataBase';

export const registrarMasivo = async ( { data, storeName }) => {
    const res = await db[storeName].bulkAdd(data);
    return res;
};

export const clearMasivo = async ( { storeName }) =>{
    const res = await db[storeName].clear();
    return res;
}

