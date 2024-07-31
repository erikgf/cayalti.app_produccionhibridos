import axios from '../../api/axios';

export const sincronizeAsk = async ({id_empresa}) => {
    const sentData = {
        id_empresa        
    };
    const paramsData = new URLSearchParams(sentData);
    const res = await axios.get(`/produccion-pozos/sincronize/ask?${paramsData.toString()}`);
    return res.data;
};

export const sincronizeSend = async(data) => {
    const res = await axios.post(`/produccion-pozos/sincronize/send`, data);
    return res.data;
};