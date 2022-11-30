import React, {useEffect, useState, useRef} from "react";
import moment from 'moment';
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import advertsServices from "../../services/advert.services";
import carsServices from "../../services/car.services";

const NewCarPage = () => {
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
    const [response, setResponse] = useState({type:0, message:""})

    const navigate = useNavigate();   

    useEffect(() => {
        getAdvertsData()
      }, []); 

    const getAdvertsData = async () => {
        const ads = await advertsServices.getAdverts();
        setAdverts(ads)
    }
    
    const handleBack = (event) => {
        event.preventDefault()
        navigate("/cars")
    }

    const handleSubmit = async (event) => {
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
        await carsServices.addCar(make, model, manufactureDate, milage, gasType, engine, color, gearbox, advertId).then(
            () => {
              setResponse({type:0, message:"Your data has been added!"})
              setTimeout(() => {
                navigate("/cars")
              }, 2000)
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
    
      if(adverts !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="mainBody">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Make</p>
                        <input type="text" onChange={e => setMake(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Model</p>
                        <input type="text" onChange={e => setModel(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Manufacture Date</p>
                        <input type="date" max={moment().format("YYYY-MM-DD")} onChange={e => setManufactureDate(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Mileage</p>
                        <input type="num" min="0" max="10000000" onChange={e => setMilage(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>GasType</p>
                        <select name="gasType" onChange={e => setGasType(e.target.value)}>
                            <option key="select" value="select">Select gas type</option>
                            <option key="petrol" value="petrol">Petrol</option>
                            <option key="diesel" value="diesel">Diesel</option>
                            <option key="electric" value="electric">Electric</option>
                            <option key="hybrid" value="hybrid">Hybrid</option>
                        </select>
                    </label>
                    <label>
                        <p>Engine</p>
                        <input type="num" min="0.1" max="10" onChange={e => setEngine(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Color</p>
                        <input type="text" onChange={e => setColor(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Gearbox</p>
                        <select name="gearbox" onChange={e => setGearbox(e.target.value)}>
                            <option key="select" value="select">Select gas type</option>
                            <option key="manual" value="manual">Manual</option>
                            <option key="automatic" value="automatic">Automatic</option>
                        </select>
                    </label>
                    <label>
                        <p>Advert type</p>
                        <select name="advert" onChange={e => setAdvertId(e.target.value)}>
                            <option key="-1" value="-1">Select the advert</option>
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
                <div className="mainBody">
                </div>
            </div>
        )
      }
}

export default NewCarPage