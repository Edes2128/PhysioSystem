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
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

export default function Klientet() {
    const fizioContext = useContext(FizioContext);
    const { clients, getClients } = fizioContext;
    const [search, setSearch] = useState('')
    const [activeIndex, setActiveIndex] = useState(-1)
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    const handleChange = (event, value) => {
        setPage(value);
    };

    const [propertyName, setProperty] = useState({
        key: '',
        direction: 'ascending'
    });

    useEffect(() => {
        getClients()
    }, [])
    const klientetFiltered = clients.filter(
        (order) =>
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase()) ||
            order.contry.toLowerCase().includes(search.toLowerCase()) ||
            order.postal_code.toString().toLowerCase().includes(search.toLowerCase()) ||
            order.city.toString().toLowerCase().includes(search.toLowerCase())
    );

    if (propertyName !== null) {
        klientetFiltered.sort((a, b) => {
            if (a[propertyName.key] < b[propertyName.key]) {
                return propertyName.direction === 'ascending' ? -1 : 1;
            }
            if (a[propertyName.key] > b[propertyName.key]) {
                return propertyName.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }
    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            propertyName &&
            propertyName.key === key &&
            propertyName.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setProperty({ key, direction });
    };

    return (
        <div className="klientet flex fd-column ai-start">

            {clients.length !== 0 ?
                <>

                    <div className="klientet-top flex ai-center jc-spaceb">
                        <p className="klientet-top-title fs-30 fw-medium" >Klientet <sup className="fs-20">({clients.length})</sup></p>
                        <div className="header-search flex ai-center">
                            <Search />
                            <input className="fs-16 fw-regular" type="text" placeholder="Search..." onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }} />
                        </div>
                    </div>

                    <div className="klientet-datatable">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => requestSort('name')} >
                                        Name
                                        {propertyName.key === 'name' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'name' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('email')}>Email

                                        {propertyName.key === 'email' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'email' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('contry')}>Country
                                        {propertyName.key === 'contry' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'contry' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('city')} >City
                                        {propertyName.key === 'city' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'city' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}

                                    </TableCell>
                                    <TableCell onClick={() => requestSort('postal_code')}>Postal Code
                                        {propertyName.key === 'postal_code' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'postal_code' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('status')}>Status
                                        {propertyName.key === 'status' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'status' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}

                                    </TableCell>
                                    <TableCell>Veprime</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {klientetFiltered.slice(start, end).map((client, index) => (
                                    <TableRow key={client.id} >
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
                                                                        axios.post('https://physiosystem.alcodeit.com/user/deleteUser',
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
                        <Pagination count={Math.ceil(klientetFiltered.length / itemPage)} onChange={handleChange} page={page} />
                    </div>
                </>
                :
                <p className='fs-28 fw-regular' style={{ color: 'white' }} >Asnje klient i regjistruar!</p>
            }
        </div>
    )
}
