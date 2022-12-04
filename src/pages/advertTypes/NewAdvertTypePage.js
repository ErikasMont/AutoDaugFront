import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import advertTypesServices from "../../services/advertTypes.services";

const NewAdvertTypePage = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [response, setResponse] = useState({type:0, message:""})

    const navigate = useNavigate();   

    const handleBack = (event) => {
        event.preventDefault()
        navigate("/advertTypes")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await advertTypesServices.addAdvertType(name, description).then(
            () => {
              setResponse({type:0, message:"Your data has been added!"})
              setTimeout(() => {
                navigate("/advertTypes")
              }, 2000)
            },
            error => {
                console.log(error.response.data)
                setResponse({type:1, message: error.response.data})
              })
      }
    
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
                {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                <div>
                    <center>
                        <button type="submit">Submit</button>
                    </center>
                </div>
            </form>
            <button onClick={handleBack}>Back to advert types</button>
            </div>
        </div>
    )
    
}

export default NewAdvertTypePage