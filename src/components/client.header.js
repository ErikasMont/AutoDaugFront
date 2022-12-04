import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import './header.css';
import {Link, useNavigate } from "react-router-dom";

const Nav = styled.nav`
  background-color: rgb(70, 67, 67);
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
  .title{
    padding: 0;
    padding-top: 5px;
    margin: 0px;
    margin-left: 10px;
    cursor: pointer;
    color: white;
  }
  .headerTitle{
    width: 140px;
    height: 50px;
    background-color: rgb(70, 67, 67);
  }
`

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <Nav>
        <div className="headerTitle">
            <h2 className='title' onClick={() =>{navigate('/main')}}>AutoDaug</h2>
        </div>
        <Burger />
        </Nav>
    )
}

export default Navbar