import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth.services';
import Logo from '../../components/Logo';

export default function LoginPage() {

    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    
    const handleSubmit = (event) => 
    {
      event.preventDefault();

      authServices.login(username,password).then(
      userData => {
        setError(setError(""));
        authServices.navigateToDefaultPage(navigate)
      },
      error => {
          setError(error.response.data)
      }
    )};

    return(
        <div className='login-container'>
            <div className='path'>
                <center>
                    <Logo/>
                </center>
            </div>
            <center>
                <h1>AutoDaug</h1>
            </center>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text"  onChange={e => setUsername(e.target.value)} required={true} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} required={true}></input>
            </label>
            <p className='error-message'>{error}</p>
            <div>
                <center>
                    <button type="submit">Login</button>
                </center>
            </div>
            </form>
        <div className='link-container'> 
            <Link className='login-link' to="/register">Not a user? Register here</Link>
        </div>
        </div>
      )
}