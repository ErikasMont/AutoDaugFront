import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/client.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertsServices from "../../services/advert.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAdverts()
      }, []);
    
    async function getAdverts()
    {
        const ads = await advertsServices.getAdverts()
        setAdverts(ads)
    }

    const handleNew = (event) => {
        event.preventDefault()
        navigate("/adverts/new")
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        navigate("/adverts/edit", {state:{advertId:event.target.edit.value}})
      }

    const handleDelete = async (event) => {
        event.preventDefault()
        await advertsServices.deleteAdvert(event.target.type.value)
        await getAdverts()
    }

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className="mainBody">
            <Table autoHeight data={adverts} bordered>
                <Column width={150}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name"/>
                </Column>
                <Column width={150}>                    
                    <HeaderCell>Description</HeaderCell>
                    <Cell dataKey="description"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell>Price</HeaderCell>
                    <Cell dataKey="price"/>
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
            <button onClick={handleNew}>Add advert</button>
            </div>
        </div>
      )
}

export default AdvertsPage