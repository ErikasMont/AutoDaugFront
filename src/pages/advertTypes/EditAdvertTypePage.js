import React, {useEffect, useState, useRef} from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import advertTypesServices from "../../services/advertTypes.services";

const EditAdvertTypePage = () => {
    const [advertType, setAdvertType] = useState()
    const [advertTypeId, setAdvertTypeId] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [response, setResponse] = useState({type:0, message:""})
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        getAdvertTypeData()
      }, []);    

      async function getAdvertTypeData(){
        setAdvertTypeId(location.state.advertTypeId)
        const at = await advertTypesServices.getAdvertType(location.state.advertTypeId)
        setAdvertType(at)
        setName(at.name)
        setDescription(at.description)
      }

    const handleEdit = async (event) => {
        event.preventDefault()
        await advertTypesServices.updateAdvertType(advertTypeId, name, description).then(
            () => {
              setResponse({type:0, message:"Your data has been updated!"})
            },
            error => {
                if(error.response.data.errors.Name !== undefined){
                    setResponse({type:1, message: error.response.data.errors.Name[0]})
                }
                else{
                    setResponse({type:1, message: error.response.data.errors.Description[0]})
                }
              })
      }
      const handleBack = (event) => {
        event.preventDefault()
        navigate("/advertTypes")
      }
    
    if(advertType !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="main-body">
                <form onSubmit={handleEdit}>
                    <label>
                        <p>Name</p>
                        <input type="text" defaultValue={advertType.name} onChange={e => setName(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Description</p>
                        <input type="text" defaultValue={advertType.description} onChange={e => setDescription(e.target.value)} required={true}></input>
                    </label>
                    {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                    <div>
                        <center>
                            <button type="submit">Confirm data</button>
                        </center>
                    </div>
                </form>
                <button onClick={handleBack}>Back to advert types</button>
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
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
    
}

export default EditAdvertTypePage