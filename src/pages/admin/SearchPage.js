import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import Header from '../../components/admin.header';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import advertTypesServices from "../../services/advertTypes.services";
import "rsuite-table/dist/css/rsuite-table.css";

const AdminSearchPage = () => {
    const [adverts, setAdverts] = useState([])

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getAdverts()
      }, []);
    
    async function getAdverts()
    {
        const ads = await advertTypesServices.getAdvertsByType(location.state.advertTypeId)
        setAdverts(ads)
    }

    const handleDetails = (advertId) => {
        navigate("/adminAdvert", {state:{advertId:advertId}})
    }

    return(
        <div>
            <div className="markerContainer">
                <Header/>
            </div>
            <div className="main-body">
            <Table autoHeight wordWrap="break-word" data={adverts} bordered>
                <Column width={500}>
                    <HeaderCell>Adverts</HeaderCell>
                    <Cell>{(rowData, rowIndex) => {
                        return <div className="search-row" name="ad" onClick={() => handleDetails(rowData.id)}>
                            <input type="hidden" name="advertId" value={rowData.id}/> 
                            <h3>{rowData.name}</h3>
                            <p>{rowData.description}</p>
                            <br/>
                            <p>{rowData.price}</p>   
                        </div>
                    }}
                    </Cell>
                </Column>
            </Table>
            </div>
        </div>
      )
}

export default AdminSearchPage