import React from 'react';
import './header.css';
import {useNavigate } from "react-router-dom";
import authServices from '../services/auth.services';

const ClientHeader = () =>{

    const navigate = useNavigate();
    const handleClick = ()=>{
       authServices.logout()
       navigate('/login')
    }
    return(
        <div className='div-header'>
            <div className='div-svg'>
                <div className='headerTitle'>
                    <h2 className='title' onClick={() =>{navigate('/main')}}>AutoDaug</h2>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/cars')}} className='header-btn'>My cars</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/adverts')}} className='header-btn'>My adverts</button>
                </div>
            </div>
            <div className='div-svg'>
                <div className='menu-item'>
                    <button onClick={() => { navigate('/profile')}} className='header-btn'>Profile</button>
                </div>
                <div className='menu-item'>
                    <button onClick={handleClick} className='header-btn'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default ClientHeader;