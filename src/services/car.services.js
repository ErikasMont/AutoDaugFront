import axios from "axios";

const API_URL = "https://localhost:7168/api";
const user = JSON.parse(localStorage.getItem('user'));

class CarsService {
    getCars(){
        return axios
        .get(API_URL + "/cars", { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    getCar(carId){
        return axios
        .get(API_URL + "/cars/" + carId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    addCar(make, model, manufactureDate, milage, gasType, engine, color, gearbox, advert_Id){
        return axios
        .post(API_URL + "/cars", {make:make, model:model, manufactureDate:manufactureDate, milage:milage, gasType:gasType, engine:engine, color:color, gearbox:gearbox, advert_Id:advert_Id, user_Id:user.id}, 
        { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data;
        })
    }
    updateCar(carId, make, model, manufactureDate, milage, gasType, engine, color, gearbox, advert_Id){
        return axios
        .put(API_URL + "/cars/" + carId , {make:make, model:model, manufactureDate:manufactureDate, milage:milage, gasType:gasType, engine:engine, color:color, gearbox:gearbox, advert_Id:advert_Id},
         { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
    deleteCar(carId){
        return axios
        .delete(API_URL + "/cars/" + carId, { headers: { 'Authorization': user.token }})
        .then(response => {
            return response.data
        })
    }
}

export default new CarsService()