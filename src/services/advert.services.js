import axios from "axios";

const API_URL = "https://localhost:7168/api";
const user = JSON.parse(localStorage.getItem('user'));

class AdvertsService {
    getAdverts(){
        return axios
        .get(API_URL + "/adverts", { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    getAdvert(advertId){
        return axios
        .get(API_URL + "/adverts/" + advertId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    addAdvert(name, description, price, advertTypeId){
        return axios
        .post(API_URL + "/adverts", {name:name, description:description, price:price, advertTypeId:advertTypeId, user:user.id}, 
        { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data;
        })
    }
    updateAdvert(advertId, name, description, price, advertTypeId){
        return axios
        .put(API_URL + "/adverts/" + advertId , {id:advertTypeId, name:name, description:description, price:price, advertType_Id:advertTypeId},
         { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    deleteAdvert(advertId){
        return axios
        .delete(API_URL + "/adverts/" + advertId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
}

export default new AdvertsService()