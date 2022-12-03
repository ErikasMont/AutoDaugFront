import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertsServices from "../../services/advert.services";
import carsServices from "../../services/car.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AllAdvertsPage = () => {
    const [adverts, setAdverts] = useState([])
    const [cars, setCars] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAdverts()
      }, []);
    
    async function getAdverts()
    {
        const ads = await advertsServices.getAdverts()
        const c = await carsServices.getCars()
        setCars(c)
        setAdverts(ads)
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        navigate("/allAdverts/edit", {state:{advertId:event.target.edit.value}})
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
                <Column width={350}>                    
                    <HeaderCell></HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        const temp = cars.map((car) => car.advert_Id === rowData.id)
                        if(temp[0] === false){
                            return <form onSubmit={handleDelete}>
                            <input type="hidden" name="type" value={rowData.id}/>
                            <button className="tableButton">Delete</button>
                            </form>
                        }
                        else{
                            return <p className='error-message'>Can't delete. Advert has a car, delete the car first</p>
                        }
                    }}
                    </Cell>
                </Column>
            </Table>
            </div>
        </div>
      )
}

export default AllAdvertsPage