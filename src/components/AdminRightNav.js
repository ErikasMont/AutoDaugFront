import React from 'react';
import styled from 'styled-components';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../services/auth.services';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(70, 67, 67);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
  .header-btn
{
    width: auto;
    font-size: large;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0);
    margin: 10px;
    height: auto;
    padding-bottom: 10px;

}
.header-btn:hover
{
    background-color: rgba(255, 255, 255, 0);
    color: #2e3034;

}
`;

const RightNav = ({ open }) => {
    const navigate = useNavigate()

    const handleClick = ()=>{
        authServices.logout()
        navigate('/login')
     }

  return (
    <Ul open={open}>
        <div className='menu-item'>
                    <button onClick={()=>{ navigate('/allCars')}} className='header-btn'>All cars</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/allAdverts')}} className='header-btn'>All adverts</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/users')}} className='header-btn'>All users</button>
                </div>
                <div className='menu-item'>
                    <button onClick={()=>{ navigate('/advertTypes')}} className='header-btn'>Advert types</button>
                </div>
                <div className='menu-item'>
                    <button onClick={handleClick} className='header-btn'>Logout</button>
                </div>
    </Ul>
  )
}

export default RightNav