import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth.services';
import Header from '../../components/client.header';

const ClientMainPage = () => {

    const navigate = useNavigate();

    return(
        <div>
            <Header/>
            <div className='mainBody'>
                <p>Welcome client!</p>
            </div>  
        </div>
      )
}

export default ClientMainPage