import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertsServices from "../../services/advert.services";
import carsServices from "../../services/car.services";
import usersServices from "../../services/user.services";
import moment from 'moment';
import "rsuite-table/dist/css/rsuite-table.css";

const AdminAdvertPage = () => {
    const [advert, setAdvert] = useState()
    const [user, setUser] = useState()
    const [car, setCar] = useState()

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        getInfo()
      }, []);
    
    async function getInfo()
    {
        const ad = await advertsServices.getAdvert(location.state.advertId)
        const c = await carsServices.getCars()
        const adCar = c.filter(car => {
            return car.advert_Id === location.state.advertId
        })
        const usr = await usersServices.getUser(ad.user_Id)
        setUser(usr)
        setCar(adCar[0])
        setAdvert(ad)
    }
    if(advert !== undefined && car !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                    <h1>{advert.name}</h1>
                    <p>Make: {car.make}</p>
                    <p>Model: {car.model}</p>
                    <p>Year of manufacture: {moment(car.manufactureDate).format("YYYY-MM-DD")}</p>
                    <p>Milage: {car.milage} km</p>
                    <p>Gas type: {car.gasType}</p>
                    <p>Engine: {car.engine} l</p>
                    <p>Color: {car.color}</p>
                    <p>Gearbox: {car.gearbox}</p>
                    <p>{advert.description}</p>
                    <p>Price: {advert.price}</p>
                    <p>Seller contact info: {user.phoneNumber}</p>
                </div>
            </div>
          )
    }
    if(advert === undefined && car === undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                </div>
            </div>
          )
    }
    if(car === undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                    <h1>{advert.name}</h1>
                    <p>{advert.description}</p>
                    <p>Price: {advert.price}</p>
                    <p>Seller contact info: {user.phoneNumber}</p>
                </div>
            </div>
          )
    }
}

export default AdminAdvertPage