import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertTypesServices from "../../services/advertTypes.services";
import advertsServices from "../../services/advert.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AdvertTypesPage = () => {
    const [advertTypes, setAdvertTypes] = useState([])
    const [adverts, setAdverts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAdvertTypes()
      }, []);
    
    async function getAdvertTypes()
    {
        const types = await advertTypesServices.getAdvertTypes()
        const ads = await advertsServices.getAdverts()
        setAdverts(ads)
        setAdvertTypes(types)
    }

    const handleNew = (event) => {
        event.preventDefault()
        navigate("/advertTypes/new")
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        navigate("/advertTypes/edit", {state:{advertTypeId:event.target.edit.value}})
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
            <div className="main-body">
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
                <Column width={430}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        const temp = adverts.map((ad) => ad.advertType_Id === rowData.id)
                        if(temp[0] === false){
                            return <form onSubmit={handleDelete}>
                            <input type="hidden" name="type" value={rowData.id}/>
                            <button className="tableButton">Delete</button>
                            </form>
                        }
                        else{
                            return <p className='error-message'>Can't delete. Advert type has adverts, delete the adverts first</p>
                        }
                    }}
                    </Cell>
                </Column>
            </Table>
            <button onClick={handleNew}>Add advert type</button>
            </div>
        </div>
      )
}

export default AdvertTypesPage