import axios from "axios";

const notificationsApi = axios.create({
    baseURL: "http://localhost:5000/api/notifications",
    withCredentials: true
})

export async function getNotifications(){
    const data = await notificationsApi.get(`/get`).then(({data}) => data);    
    console.log(data)
    return data;
}