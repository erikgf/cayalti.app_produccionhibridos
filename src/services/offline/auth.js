import { localDataBase as db } from "../../data";

export const logIn = async ( { usuario }) => {
    const data = await db.usuarios
                        .where("usuario")
                        .equals(usuario)
                        .toArray();
    return data;
};
