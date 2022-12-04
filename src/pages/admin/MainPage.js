import React, {useEffect, useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth.services';
import advertTypesServices from "../../services/advertTypes.services";
import Header from '../../components/admin.header';

const AdminMainPage = () => {
    const [advertTypes, setAdvertTypes] = useState([])
    const [advertTypeId, setAdvertTypeId] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getAdvertTypes()
      }, []);
    
    async function getAdvertTypes()
    {
        const types = await advertTypesServices.getAdvertTypes()
        setAdvertTypes(types)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        if(event.target.type.value === "-1"){
            setError("Please select a valid advert type")
        }
        else{
            navigate("/adminSearch", {state:{advertTypeId:event.target.type.value}})
        }
    }

    return(
        <div>
            <Header/>
            <div className='mainBody'>
                <div className='login-container'>
                <center>
                    <p>Welcome {user.username}!</p>
                </center>
                <p>Select the advert type and see the adverts of other users</p>
                <form onSubmit={handleSearch}>
                    <select name="type" onChange={e => setAdvertTypeId(e.target.value)}>
                        <option key="-1" value="-1">Select the advert type</option>
                        {advertTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                    <p className='error-message'>{error}</p>
                    <div>
                        <center>
                            <button type="submit">Search</button>
                        </center>
                    </div>
                </form>
                </div>
            </div>  
        </div>
      )
}

export default AdminMainPage