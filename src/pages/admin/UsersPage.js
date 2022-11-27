import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import adminServices from '../../services/admin.services';
import "rsuite-table/dist/css/rsuite-table.css";

const UsersPage = () => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getUserData()
      }, []);
    
    async function getUserData()
    {
        const us = await adminServices.getAllUsers()
        setUsers(us)
    }

    const handleConfirm = async (event) => {
        event.preventDefault()
        await adminServices.confirmUser(event.target.user.value)
        await getUserData()
      }

    const handleDelete = async (event) => {
        event.preventDefault()
        await adminServices.deleteUser(event.target.user.value)
        await getUserData()
    }

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className="mainBody">
            <Table autoHeight data={users} bordered>
                <Column width={150}>
                    <HeaderCell>Username</HeaderCell>
                    <Cell dataKey="username"/>
                </Column>
                <Column width={150}>                    
                    <HeaderCell>Phone number</HeaderCell>
                    <Cell dataKey="phoneNumber"/>
                </Column>
                <Column width={150}>                    
                    <HeaderCell>Account State</HeaderCell>
                    <Cell dataKey="accountState"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        return <form onSubmit={handleDelete}>
                            <input type="hidden" name="user" value={rowData.id}/>
                            <button className="tableButton">Delete</button>
                            </form>
                    }}
                    </Cell>
                </Column>
                <Column width={150}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        if(rowData.accountState === "Not confirmed"){
                            return <form onSubmit={handleConfirm}>
                                <input type="hidden" name="user" value={rowData.id}/>
                                <button className="tableButton">Confirm account</button>
                                </form>
                        }
                    }}
                    </Cell>
                </Column>
            </Table>
            </div>
        </div>
      )
}

export default UsersPage