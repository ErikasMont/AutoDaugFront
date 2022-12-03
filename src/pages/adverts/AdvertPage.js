import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertsServices from "../../services/advert.services";
import carsServices from "../../services/car.services";
import usersServices from "../../services/user.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AdvertPage = () => {
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
                <div className="mainBody">
                    <h1>{advert.name}</h1>
                    <p>{advert.description}</p>
                    <p>{advert.price}</p>
                    <p>{car.make} {car.model}</p>
                    <p>{user.phoneNumber}</p>
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
                <div className="mainBody">
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
                <div className="mainBody">
                    <h1>{advert.name}</h1>
                    <p>{advert.description}</p>
                    <p>{advert.price}</p>
                    <p>{user.phoneNumber}</p>
                </div>
            </div>
          )
    }
}

export default AdvertPage