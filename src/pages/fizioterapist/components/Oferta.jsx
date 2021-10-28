import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import FizioContext from '../../../context/fizioterapist/FizioContext';
import { ReactComponent as Edit } from '../../../images/edit-icon.svg'
import { ReactComponent as Delete } from '../../../images/delete-icon.svg'
import { ReactComponent as AddOffer } from '../../../images/add-offer.svg'
import axios from 'axios'
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

export default function Oferta() {
    const fizioContext = useContext(FizioContext)
    const { offers, getOffers, expireOffer, activateOffer } = fizioContext;
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

    if (propertyName !== null) {
        offers.sort((a, b) => {
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

    useEffect(() => {
        getOffers()
        expireOffer()
        activateOffer()
    }, [])

    const colorStat = (status) => {
        if (status === 1) {
            return '#9BFFC3';
        } else if (status === 2) {
            return '#FFF47D';
        } else {
            return '#FF4848';
        }
    }
    const renderButtonStatus = (status) => {
        if (status === 1) {
            return 'Aktive';
        } else if (status === 2) {
            return 'Scheldued';
        } else {
            return 'Expired';
        }
    };

    return (
        <div className="oferta" >
            {offers.length === 0 ?
                <div className='oferta-empty' >
                    <p className='fs-28 fw-medium' >Nuk ka asnje oferte!</p>
                    <Link to='/fizio/addoffer' className='fs-16 fw-regular' >Shto Oferte</Link>
                </div>
                :
                <>
                    <div className="oferta-top flex jc-spaceb ai-center">
                        <p className="fs-30 fw-semib" >Oferta <sup className="fs-20" >({offers.length})</sup> </p>
                        <Link to="/fizio/addoffer" className="oferta-top-btn-add  flex ai-center fs-18 fw-regular" >Shto Oferte
                            <AddOffer />
                        </Link>
                    </div>
                    <div className="oferta-datatable">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => requestSort('titulli')}>
                                        Titulli Ofertes
                                        {propertyName.key === 'titulli' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'titulli' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('date_created')}>
                                        Data Krijimit
                                        {propertyName.key === 'date_created' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'date_created' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('end_date')}>
                                        Data Mbarimit
                                        {propertyName.key === 'end_date' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'end_date' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('ulja')}>
                                        Ulja
                                        {propertyName.key === 'ulja' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'ulja' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('status')}>
                                        Status
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
                                {offers.slice(start, end).map((ofert, index) => (
                                    <TableRow>
                                        <TableCell>{ofert.titulli}</TableCell>
                                        <TableCell>{ofert.date_created}</TableCell>
                                        <TableCell>{ofert.end_date}</TableCell>
                                        <TableCell>{ofert.ulja}{ofert.ulja_type === 1 ? '%' : '€'}</TableCell>
                                        <TableCell>
                                            <span style={{
                                                color: ofert.status === 1 || ofert.status === 2 ? 'black' : 'white',
                                                backgroundColor: colorStat(ofert.status),
                                                padding: '10px 15px',
                                            }} >
                                                {renderButtonStatus(ofert.status)}
                                            </span>
                                        </TableCell>
                                        <TableCell >
                                            <div className="flex ai-center" style={{ position: 'relative' }} >
                                                <Link to={`/fizio/oferta/${ofert.id}`} className="table-action flex ai-center jc-center">
                                                    <Edit />
                                                </Link>
                                                {ofert.status !== 0 &&
                                                    <div className="table-action flex ai-center jc-center"  >
                                                        {activeIndex === index &&
                                                            <div className="table-action-del-offer flex fd-column ai-center">
                                                                <p className="table-action-del-offer-title">Doni te fshini kete ofert?</p>
                                                                <div className="table-action-del-offer-buttons">
                                                                    <button onClick={() => {
                                                                        axios.post('https://physiosystem.alcodeit.com/fizio/deleteOffer',
                                                                            { id: ofert.id }).then(res => {
                                                                                if (res.data.status === 1) {
                                                                                    getOffers();
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
                        <Pagination count={Math.ceil(offers.length / itemPage)} onChange={handleChange} page={page} />
                    </div>
                </>
            }
        </div>
    )
}