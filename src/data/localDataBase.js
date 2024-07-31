import Dexie from 'dexie';
import { stores }  from './stores';

//const versionDB = 1;
const localDataBaseName = import.meta.env.VITE_DB_NAME;
export const localDataBase = new Dexie(localDataBaseName);

let storesCreated = {};
stores.forEach((o,i)=>{
    let definition = o.definition;
    if (Boolean(o.indexes?.length > 0)){
        definition = `${definition},${o.indexes.toString()}`;
    }
    
    storesCreated[o.storeName] = definition;
});

localDataBase.version(1).stores(storesCreated);
