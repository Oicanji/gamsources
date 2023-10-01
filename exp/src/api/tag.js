import axios from 'axios';
import { url } from './axios';

export const axiosTag = async () => {
    const response = await axios.get(url+'/tag/all?offset=0&limit=10000000', {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.data;
};

export const axiosTagCreate = async (name, color) => {
    const response = await axios.post(url+'/tag/add', {
        name: name,
        color: color
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.data;
}