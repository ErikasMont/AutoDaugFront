import axios from "axios";

const API_URL = "https://localhost:7168/api";
const user = JSON.parse(localStorage.getItem('user'));

class AdvertTypesService {
    getAdvertTypes(){
        return axios
        .get(API_URL + "/advertTypes", { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    getAdvertType(advertTypeId){
        return axios
        .get(API_URL + "/advertTypes/" + advertTypeId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    getAdvertsByType(advertTypeId){
        return axios
        .get(API_URL + "/advertTypes/" + advertTypeId + "/adverts", { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    addAdvertType(name, description){
        return axios
        .post(API_URL + "/advertTypes", {name:name, description:description}, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data;
        })
    }
    updateAdvertType(advertTypeId, name, description){
        return axios
        .put(API_URL + "/advertTypes/" + advertTypeId , {id:advertTypeId, name:name, description:description}, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    deleteAdvertType(advertTypeId){
        return axios
        .delete(API_URL + "/advertTypes/" + advertTypeId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
}

export default new AdvertTypesService()