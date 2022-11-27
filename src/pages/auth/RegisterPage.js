import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth.services';

export default function LoginPage() {

    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error,setError] = useState("");

    
    const handleSubmit = (event) => 
    {
      event.preventDefault();

      authServices.register(username,password,phoneNumber).then(
      userData => {
        setError(setError(""));
        navigate("/login")
      },
      error => {
          setError(error.response.data)
      }
    )};

    return(
        <div>
            <h1>AutoDaug</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text"  onChange={e => setUsername(e.target.value)} required={true} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} required={true}></input>
            </label>
            <label>
                <p>Phone number</p>
                <input type="tel" pattern="^\+?[1-9][0-9]{10,10}$" onChange={e => setPhoneNumber(e.target.value)} required={true}></input>
            </label>
            <p className='error-message'>{error}</p>
            <div>
                <center>
                    <button type="submit">Register</button>
                </center>
            </div>
            </form>
        </div>
      )
}