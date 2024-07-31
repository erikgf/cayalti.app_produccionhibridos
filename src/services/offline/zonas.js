import { localDataBase as db } from "../../data";

export const getZonas = async (  ) => {
    const data = await db.zonas.toArray();
    return data;
};
