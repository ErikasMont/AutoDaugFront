import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import userServices from "../../services/user.services";

const ProfilePage = () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const [user, setUser] = useState()
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [response, setResponse] = useState({type:0, message:""})

    const navigate = useNavigate();

    useEffect(() => {
        getUserData()
      }, []);    

      async function getUserData(){
        const us = await userServices.getUser(userId)
        setUser(us)
        setUsername(us.username)
        setPhoneNumber(us.phoneNumber)
      }

    const handleEdit = async (event) => {
        event.preventDefault()
        await userServices.updateUser(userId, username, phoneNumber).then(
            () => {
              setResponse({type:0, message:"Your data has been updated!"})
            },
            error => {
                if(typeof(error.response.data) === 'string'){
                    setResponse({type:1, message: error.response.data})
                }
                else{
                    setResponse({type:1, message: error.response.data.errors.Username[0]})
                }
              })
      }
    
    if(user !== undefined){
        return(
            <div>
                <div className="markerContainer">
                    <Header/>
                </div>
                <div className="login-container">
                <form onSubmit={handleEdit}>
                    <label>
                        <p>Username</p>
                        <input type="text" defaultValue={user.username} onChange={e => setUsername(e.target.value)} required={true}/>
                    </label>
                    <label>
                        <p>Phone number</p>
                        <input type="tel" pattern="^\+?[1-9][0-9]{10,10}$" defaultValue={user.phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required={true}></input>
                    </label>
                    {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
                    <div>
                        <center>
                            <button type="submit">Confirm data</button>
                        </center>
                    </div>
                </form>
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
                    <p>Loading...</p>
                </div>
            </div>
        )
    }
    
}

export default ProfilePage