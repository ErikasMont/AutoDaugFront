import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';

const AdminMainPage = () => {

    const navigate = useNavigate();

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className='mainBody'>
                <p>Welcome admin!</p>
            </div>    
        </div>
      )
}

export default AdminMainPage