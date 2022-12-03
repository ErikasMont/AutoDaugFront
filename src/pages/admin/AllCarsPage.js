import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import carsServices from "../../services/car.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AllCarsPage = () => {
    const [cars, setCars] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getCars()
      }, []);
    
    async function getCars()
    {
        const c = await carsServices.getCars()
        setCars(c)
    }


    const handleEdit = async (event) => {
        event.preventDefault()
        navigate("/allCars/edit", {state:{carId:event.target.edit.value}})
      }

    const handleDelete = async (event) => {
        event.preventDefault()
        await carsServices.deleteCar(event.target.type.value)
        await getCars()
    }

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className="mainBody">
            <Table autoHeight data={cars} bordered>
                <Column width={90}>
                    <HeaderCell>Make</HeaderCell>
                    <Cell dataKey="make"/>
                </Column>
                <Column width={90}>                    
                    <HeaderCell>Model</HeaderCell>
                    <Cell dataKey="model"/>
                </Column>
                <Column width={150}>                    
                    <HeaderCell>Manufacture Date</HeaderCell>
                    <Cell dataKey="manufactureDate"/>
                </Column>
                <Column width={90}>                    
                    <HeaderCell>Milage</HeaderCell>
                    <Cell dataKey="milage"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell>Gas Type</HeaderCell>
                    <Cell dataKey="gasType"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell>Engine</HeaderCell>
                    <Cell dataKey="engine"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell>Color</HeaderCell>
                    <Cell dataKey="color"/>
                </Column>
                <Column width={70}>                    
                    <HeaderCell>Gearbox</HeaderCell>
                    <Cell dataKey="gearbox"/>
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

export default AllCarsPage