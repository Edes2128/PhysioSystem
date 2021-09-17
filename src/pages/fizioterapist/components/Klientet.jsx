import React, { useEffect, useContext, useState } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FizioContext from '../../../context/fizioterapist/FizioContext';
import Pagination from '@material-ui/lab/Pagination';
import { ReactComponent as Edit } from '../../../images/edit-icon.svg'
import { ReactComponent as Delete } from '../../../images/delete-icon.svg'
import axios from 'axios';

export default function Klientet() {

    const fizioContext = useContext(FizioContext);
    const { clients, getClients } = fizioContext;
    const [activeIndex, setActiveIndex] = useState(-1)
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getClients()
    }, [])

    return (
        <div className="klientet flex fd-column ai-start">

            <div className="klientet-top flex ai-center jc-spaceb">
                <p className="klientet-top-title fs-30 fw-medium" >Klientet <sup className="fs-20">({clients.length})</sup></p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="klientet-datatable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Veprime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.slice(start, end).map((client, index) => (
                            <TableRow key={client.id} >
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell> {client.email} </TableCell>
                                <TableCell>{client.contry}</TableCell>
                                <TableCell>{client.city}</TableCell>
                                <TableCell>{client.postal_code}</TableCell>
                                <TableCell>
                                    <span style={{
                                        color: client.status === 1 ? 'black' : 'white',
                                        backgroundColor: client.status === 1 ? '#28FFBF' : '#FF4848',
                                        padding: '10px 15px',
                                    }} >
                                        {client.status === 1 ? 'Active' : 'Close'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex ai-center">
                                        <Link to={`/fizio/klientet/${client.id}`} className="table-action flex jc-center ai-center">
                                            <Edit />
                                        </Link>
                                        {client.status === 1 &&
                                            <div className="table-action flex jc-center ai-center">
                                                {activeIndex === index &&
                                                    <div className="table-action-del-offer flex fd-column ai-center">
                                                        <p className="table-action-del-offer-title">Doni te fshini kete user?</p>
                                                        <div className="table-action-del-offer-buttons">
                                                            <button onClick={() => {
                                                                axios.post('http://localhost/physiosystem/server/user/deleteUser',
                                                                    { id: client.id }).then(res => {
                                                                        if (res.data.status === 1) {
                                                                            getClients()
                                                                            setActiveIndex(-1)
                                                                        }
                                                                    })
                                                            }} >Po</button>
                                                            <button onClick={() => {
                                                                setActiveIndex(-1)
                                                            }} >Jo</button>
                                                        </div>
                                                    </div>}
                                                <Delete onClick={() => {
                                                    setActiveIndex(index)
                                                }} />
                                            </div>
                                        }


                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="oferta-datatable-pagination flex jc-end">
                <Pagination count={Math.ceil(clients.length / itemPage)} onChange={handleChange} />
            </div>
        </div>
    )
}
