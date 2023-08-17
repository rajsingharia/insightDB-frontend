import axios, { AxiosInstance } from "axios"

export default class AuthAxios{
    private static instance: AxiosInstance |null = null;

    public static getAuthAxios() { 
        if(this.instance != null) return this.instance

        const token = localStorage.getItem('accessToken');

        return axios.create({
            baseURL:'http://localhost:3000/api/v1',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}