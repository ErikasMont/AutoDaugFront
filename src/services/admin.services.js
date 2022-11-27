import axios from "axios";

const API_URL = "https://localhost:7168/api";
const user = JSON.parse(localStorage.getItem('user'));

class AdminService {
    getAllUsers(){
        return axios
        .get(API_URL + "/users", { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    confirmUser(userId){
        return axios
        .post(API_URL + "/users/confirm/" + userId , {id:userId}, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    deleteUser(userId){
        return axios
        .delete(API_URL + "/users/" + userId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
}

export default new AdminService()