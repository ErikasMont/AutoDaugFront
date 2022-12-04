import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth.services';
import Logo from '../../components/Logo';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function LoginPage() {

    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [response, setResponse] = useState({type:0, message:""})

    
    const handleSubmit = (event) => 
    {
      event.preventDefault();

      authServices.register(username,password,phoneNumber).then(
      userData => {
        setResponse({type:0, message:"You have registered successfully! Now wait until the administrator confirms your account"})
      },
      error => {
        setResponse({type:1, message:error.response.data})
      }
    )};

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
            <label>
                <p>Phone number</p>
                <input type="tel" pattern="^\+?[1-9][0-9]{10,10}$" onChange={e => setPhoneNumber(e.target.value)} required={true}></input>
            </label>
            {response.type===1 ?  <p className='error-message'>{response.message}</p> : <p className='success-message'>{response.message}</p>}
            <div>
                <center>
                    <button type="submit">Register</button>
                </center>
            </div>
            </form>
            <div className='link-container'> 
                <Link className='login-link' to="/login">Already a user? Login here</Link>
                <center>
                    <button onClick={openModal}>Useful info</button>
                </center>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Useful info modal"
                >
                    <h2>Useful info</h2>
                    <p>Pick a unique username for your login, but you can update it whenever you want. It should 
                        not be shorter than 6 characters long!
                    </p>
                    <p>Pick a strong password, it has to be at least 6 characters long!</p>
                    <p>To type in the correct phone number follow the Lithuanian format e.g: +37061234567</p>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </div>
        </div>
      )
}