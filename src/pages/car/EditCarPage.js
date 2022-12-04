import React, {useEffect, useState, useRef} from "react";
import moment from 'moment';
import {Link, useNavigate, useLocation } from "react-router-dom";
import Header from '../../components/client.header';
import advertsServices from "../../services/advert.services";
import carsServices from "../../services/car.services";

const EditCarPage = () => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [manufactureDate, setManufactureDate] = useState("")
    const [milage, setMilage] = useState([])
    const [gasType, setGasType] = useState("")
    const [engine, setEngine] = useState()
    const [color, setColor] = useState("")
    const [gearbox, setGearbox] = useState("")
    const [advertId, setAdvertId] = useState()
    const [adverts, setAdverts] = useState([])
    const [advert, setAdvert] = useState()
    const [carId, setCarId] = useState()
    const [car, setCar] = useState()
    const [response, setResponse] = useState({type:0, message:""})

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        getCarData()
      }, []);    

      async function getCarData(){
        setCarId(location.state.carId)
        const c = await carsServices.getCar(location.state.carId)
        const ads = await advertsServices.getAdverts();
        const ad = await advertsServices.getAdvert(c.advert_Id);
        setAdvert(ad)
        setCar(c)
        setAdverts(ads)
        setMake(c.make)
        setModel(c.model)
        setManufactureDate(c.manufactureDate)
        setMilage(c.milage)
        setGasType(c.gasType)
        setEngine(c.engine)
        setColor(c.color)
        setGearbox(c.gearbox)
        setAdvertId(c.advert_Id)
      }

    const handleEdit = async (event) => {
        event.preventDefault()
        if(event.target.gasType.value === "select"){
            setResponse({type:1, message:"Not valid gas type selected"})
        }
        if(event.target.gearbox.value === "select"){
            setResponse({type:1, message:"Not valid gearbox selected"})
        }
        if(event.target.advert.value === "select"){
            setResponse({type:1, message:"Not valid advert selected"})
        }
        await carsServices.updateCar(carId, make, model, manufactureDate, milage, gasType, engine, color, gearbox, advertId).then(
            () => {
              setResponse({type:0, message:"Your data has been updated!"})
            },
            error => {
                if(error.response.data.errors.Make !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Make[0]})
                }
                if(error.response.data.errors.Model !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Model[0]})
                }
                if(error.response.data.errors.ManufactureDate !== undefined){
                    setResponse({type:1, message: error.response.data.errors.ManufactureDate[0]})
                }
                if(error.response.data.errors.Milage !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Milage[0]})
                }
                if(error.response.data.errors.GasType !== undefined){
                    setResponse({type:1, message: error.response.data.errors.GasType[0]})
                }
                if(error.response.data.errors.Engine !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Engine[0]})
                }
                if(error.response.data.errors.Color !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Color[0]})
                }
                if(error.response.data.errors.Gearbox !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Gearbox[0]})
                }
                if(error.response.data.errors.AdvertType_Id !== undefined){
                    setResponse({type:1, message: error.response.data.errors.AdvertType_Id[0]})
                }
              })
      }
      const handleBack = (event) => {
        event.preventDefault()
        navigate("/cars")
      }

    
    if(adverts !== undefined && car !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                <form onSubmit={handleEdit}>
                    <label>
                        <p>Make</p>
                        <input type="text" defaultValue={car.make} onChange={e => setMake(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Model</p>
                        <input type="text" defaultValue={car.model} onChange={e => setModel(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Manufacture Date</p>
                        <input type="date" defaultValue={car.manufactureDate} max={moment().format("YYYY-MM-DD")} onChange={e => setManufactureDate(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Mileage</p>
                        <input type="num" min="0" max="10000000" defaultValue={car.milage} onChange={e => setMilage(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>GasType</p>
                        <select name="gasType" onChange={e => setGasType(e.target.value)} defaultValue={car.gasType}>
                            <option key="select" value="select">Select gas type</option>
                            <option key="petrol" value="petrol">Petrol</option>
                            <option key="diesel" value="diesel">Diesel</option>
                            <option key="electric" value="electric">Electric</option>
                            <option key="hybrid" value="hybrid">Hybrid</option>
                        </select>
                    </label>
                    <label>
                        <p>Engine</p>
                        <input type="num" min="0.1" max="10" defaultValue={car.engine} onChange={e => setEngine(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Color</p>
                        <input type="text" defaultValue={car.color} onChange={e => setColor(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Gearbox</p>
                        <select name="gearbox" defaultValue={car.gearbox} onChange={e => setGearbox(e.target.value)}>
                            <option key="select" value="select">Select gas type</option>
                            <option key="manual" value="manual">Manual</option>
                            <option key="automatic" value="automatic">Automatic</option>
                        </select>
                    </label>
                    <label>
                        <p>Advert</p>
                        <select name="advert" onChange={e => setAdvertId(e.target.value)} defaultValue={car.advert_Id}>
                            {adverts.map((ad) => <option key={ad.id} value={ad.id}>{ad.name}</option>)}
                        </select>
                    </label>
                    {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                    <div>
                        <center>
                            <button type="submit">Submit</button>
                        </center>
                    </div>
                </form>
                <button onClick={handleBack}>Back to cars</button>
                </div>
            </div>
        )
    }
    else{
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
    
}

export default EditCarPage