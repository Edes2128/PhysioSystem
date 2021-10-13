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
                                    <TableCell>Titulli Ofertes</TableCell>
                                    <TableCell>Data Krijimit</TableCell>
                                    <TableCell>Data Mbarimit</TableCell>
                                    <TableCell>Ulja</TableCell>
                                    <TableCell>Status</TableCell>
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