import Dexie from "dexie";
import { localDataBase as db } from "../../data";

const all = Dexie.Promise.all;

export const getRegistros = async ({fecha_dia}) => {
    const data = await db.registroDetalle.where({fecha_dia}).toArray();
    return data;
};

export const obtenerRegistrosPorPozo = async ( {fecha_dia, id_pozo} ) => {
    const data = await db.registroDetalle
                        .where({fecha_dia, id_pozo})
                        .toArray();
    return data;
};

export const getRegistro = async ( {id} ) => {
    const data = await db.registroDetalle
                        .where("id")
                        .equals(parseInt(id))
                        .first();
    return data;
};

export const createRegistro = async ( {fecha_dia, dni_usuario, id_pozo, descripcion_pozo, valor_inicial, hora_inicial, enviado_inicial, enviado_final} ) => {
    const id = await db.registroDetalle
                        .add({fecha_dia, dni_usuario, id_pozo, descripcion_pozo, valor_inicial, hora_inicial, enviado_inicial, enviado_final});
    return id;
};

export const updateRegistro = async(id, { valor_inicial, hora_inicial, valor_final, hora_final, horas_total, valor_total}) => {
    const update = await db.registroDetalle
                            .update(id, {
                                valor_inicial, hora_inicial, valor_final, hora_final, horas_total, valor_total
                            });

    return update;
};

export const deleteRegistro = async(id) => {
    return await db.registroDetalle.delete(id);
};

export const obtenerRegistrosEnvio = async ( {fecha_dia } ) => {
    const data = await db.registroDetalle
                        .where({fecha_dia})
                        .toArray();
    return data;
};


export const marcarRegistros = async({fecha_dia}) =>{
    const preResults = await all([
        db.registroDetalle.where({fecha_dia}).toArray(),
    ]);

    let resultsToUpdate = preResults.map((result)=>{
        return result.map((o)=>{
            if (Boolean(o?.valor_final)){
                return {...o, enviado_inicial: 1, enviado_final: 1};
            }
            return {...o, enviado_inicial: 1};
        });
    });
    
    await all([
        db.registroDetalle.bulkPut(resultsToUpdate[0]),
    ]);

    return preResults;
};