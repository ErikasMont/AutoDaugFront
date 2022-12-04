import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import advertsServices from "../../services/advert.services";
import advertTypesServices from "../../services/advertTypes.services";

const EditAdvertPage = () => {
    const [advertId, setAdvertId] = useState()
    const [advertTypes, setAdvertTypes] = useState([])
    const [advertType, setAdvertType] = useState()
    const [advert, setAdvert] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [advertTypeId, setAdvertTypeId] = useState()
    const [response, setResponse] = useState({type:0, message:""})
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        getAdvertData()
      }, []);    

      async function getAdvertData(){
        setAdvertId(location.state.advertId)
        const ad = await advertsServices.getAdvert(location.state.advertId)
        const types = await advertTypesServices.getAdvertTypes();
        const type = await advertTypesServices.getAdvertType(ad.advertType_Id);
        setAdvertType(type)
        setAdvert(ad)
        setAdvertTypes(types)
        setName(ad.name)
        setDescription(ad.description)
        setPrice(ad.price)
        setAdvertTypeId(ad.advertType_Id)
      }

    const handleEdit = async (event) => {
        event.preventDefault()
        console.log(advertTypeId)
        await advertsServices.updateAdvert(advertId, name, description, price, advertTypeId).then(
            () => {
              setResponse({type:0, message:"Your data has been updated!"})
            },
            error => {
                if(error.response.data.errors.Name !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Name[0]})
                }
                if(error.response.data.errors.Description !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Description[0]})
                }
                if(error.response.data.errors.Price !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Price[0]})
                }
                if(error.response.data.errors.AdvertType_Id !== undefined){
                    setResponse({type:1, message: error.response.data.errors.AdvertType_Id[0]})
                }
              })
      }
      const handleBack = (event) => {
        event.preventDefault()
        navigate("/adverts")
      }

    
    if(advert !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                <form onSubmit={handleEdit}>
                    <label>
                        <p>Name</p>
                        <input type="text" defaultValue={advert.name} onChange={e => setName(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Description</p>
                        <input type="text" defaultValue={advert.description} onChange={e => setDescription(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Price</p>
                        <input type="number" min="0" defaultValue={advert.price} onChange={e => setPrice(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Advert type</p>
                        <select onChange={e => setAdvertTypeId(e.target.value)} defaultValue={advertType.id}>
                            {advertTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </select>
                    </label>
                    {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                    <div>
                        <center>
                            <button type="submit">Confirm data</button>
                        </center>
                    </div>
                </form>
                <button onClick={handleBack}>Back to adverts</button>
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

export default EditAdvertPage