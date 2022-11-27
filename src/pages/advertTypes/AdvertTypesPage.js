import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertTypesServices from "../../services/advertTypes.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AdvertTypesPage = () => {
    const [advertTypes, setAdvertTypes] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAdvertTypes()
      }, []);
    
    async function getAdvertTypes()
    {
        const types = await advertTypesServices.getAdvertTypes()
        setAdvertTypes(types)
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        navigate("/advertTypes/edit")
      }

    const handleDelete = async (event) => {
        event.preventDefault()
        await advertTypesServices.deleteAdvertType(event.target.type.value)
        await getAdvertTypes()
    }

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className="mainBody">
            <Table autoHeight data={advertTypes} bordered>
                <Column width={150}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name"/>
                </Column>
                <Column width={150}>                    
                    <HeaderCell>Description</HeaderCell>
                    <Cell dataKey="description"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        return <form onSubmit={handleEdit}>
                            <input type="hidden" name="edit" value={rowData.id}/>
                            <button className="tableButton">Edit</button>
                            </form>
                    }}
                    </Cell>
                </Column>
                <Column width={150}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        return <form onSubmit={handleDelete}>
                        <input type="hidden" name="type" value={rowData.id}/>
                        <button className="tableButton">Delete</button>
                        </form>
                    }}
                    </Cell>
                </Column>
            </Table>
            </div>
        </div>
      )
}

export default AdvertTypesPage