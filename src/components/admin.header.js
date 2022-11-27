import React from 'react';
import './header.css';
import {useNavigate } from "react-router-dom";
import authServices from '../services/auth.services';

const AdminHeader = () =>{

    const navigate = useNavigate();
    const handleClick = ()=>{
       authServices.logout()
       navigate('/login')
    }
    return(
        <div className='div-header'>
            <div className='div-svg'>
                <div className='headerTitle'>
                    <h2 className='title' onClick={() =>{navigate('/dashboard')}}>AutoDaug</h2>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/cars')}} className='header-btn'>All cars</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/adverts')}} className='header-btn'>All adverts</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/users')}} className='header-btn'>All users</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/advertTypes')}} className='header-btn'>Advert types</button>
                </div>
            </div>
            <div className='div-svg'>
                <div className='menu-item'>
                    <button onClick={handleClick} className='header-btn'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader;