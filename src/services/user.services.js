import axios from "axios";

const API_URL = "https://localhost:7168/api";
const user = JSON.parse(localStorage.getItem('user'));

class UserService {
    getUser(userId){
        return axios
        .get(API_URL + "/users/" + userId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    updateUser(userId, username, phoneNumber){
        return axios
        .put(API_URL + "/users/" + userId , {id:userId, username:username, phoneNumber:phoneNumber}, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
}

export default new UserService()