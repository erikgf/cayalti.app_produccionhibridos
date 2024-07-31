import { localDataBase as db } from "../../data";

export const getPozos = async (  ) => {
    const data = await db.pozos.toArray();
    return data;
};
