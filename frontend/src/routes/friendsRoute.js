import axios from "axios";

const friendsApi = axios.create({
     baseURL: "http://localhost:5000/api/friends",
     withCredentials: true
})

export async function areFriends(receiver_id){
    const data = await friendsApi.post(`/getFriendStatus`,{receiver_id: receiver_id}).then(({data}) => data);    
    return data;
}

export async function getFriends() { 
    let data = await friendsApi.get(`/get`).then(({data}) => data);    
    console.log(data);
    return data;
}

export async function removeFriend(receiver_id) {
   
    await friendsApi.post('/remove',{     
        receiver_id: receiver_id
     
    }).then(console.log("deleted"));  
}

export async function sendInvitation(receiver_id){
    await friendsApi.post('/sendRequest',{
        receiver_id: receiver_id
    }).then((resp)=>{return resp.status})
}

export async function cancelFriendRequest(receiver_id){
    console.log(receiver_id)
    await friendsApi.post('/cancelFriendRequest',{
        receiver_id: receiver_id
    }).then((resp)=>{return resp.status})
}

export async function acceptInvitation(sender_id, notification_id){
    await friendsApi.post('/acceptFriendRequest',{
        sender_id: sender_id,
        notification_id: notification_id
    }).then((resp)=>{return(resp.status)})
}

export async function declineInvitation(sender_id, notification_id){
    await friendsApi.post('/declineFriendRequest',{
        sender_id: sender_id,
        notification_id: notification_id
    }).then((resp)=>{return resp.status})
}

export async function coverage(friend_id){
    let data = await friendsApi.get(`/coverage/`+friend_id).then(data=>data)
    return data;
}