import axios from 'axios';
import { url } from './axios';

export const axiosTag = async () => {
    
    const response = await axios.get(url+'/tag/all?offset=0&limit=25', {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response;
};