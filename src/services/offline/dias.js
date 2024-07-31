import { localDataBase as db } from "../../data";

export const getDias = async ( {dni_usuario} ) => {
    const data = await db.registroCabecera
                        .where("dni_usuario")
                        .equals(dni_usuario)
                        .toArray();
    return data;
};

export const createDia = async ( {fecha_dia, dni_usuario} ) => {
    const id = await db.registroCabecera
                        .add({fecha_dia, dni_usuario});
    return id;
};
