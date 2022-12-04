import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import advertTypesServices from "../../services/advertTypes.services";
import advertsServices from "../../services/advert.services";

const NewAdvertPage = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [advertTypes, setAdvertTypes] = useState([])
    const [advertTypeId, setAdvertTypeId] = useState()
    const [response, setResponse] = useState({type:0, message:""})

    const navigate = useNavigate();   

    useEffect(() => {
        getAdvertTypesData()
      }, []); 

    const getAdvertTypesData = async () => {
        const types = await advertTypesServices.getAdvertTypes();
        setAdvertTypes(types)
    }
    
    const handleBack = (event) => {
        event.preventDefault()
        navigate("/adverts")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(event.target.type.value === "-1"){
            setResponse({type:1, message:"Not valid advert type selected"})
        }
        else{
            await advertsServices.addAdvert(name, description, price, advertTypeId).then(
                () => {
                  setResponse({type:0, message:"Your data has been added!"})
                  setTimeout(() => {
                    navigate("/adverts")
                  }, 2000)
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
        
      }
    
      if(advertTypes !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input type="text" onChange={e => setName(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Description</p>
                        <input type="text" onChange={e => setDescription(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Price</p>
                        <input type="number" min="0" onChange={e => setPrice(e.target.value)} required={true}></input>
                    </label>
                    <label>
                        <p>Advert type</p>
                        <select name="type" onChange={e => setAdvertTypeId(e.target.value)}>
                            <option key="-1" value="-1">Select the advert type</option>
                            {advertTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </select>
                    </label>
                    {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                    <div>
                        <center>
                            <button type="submit">Submit</button>
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

export default NewAdvertPage