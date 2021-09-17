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
import axios from 'axios'

export default function Oferta() {
    const fizioContext = useContext(FizioContext)
    const { offers, getOffers } = fizioContext;
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
    }, [])
    return (
        <div className="oferta" >
            <div className="oferta-top flex jc-spaceb ai-center">
                <p className="fs-30 fw-semib" >Oferta <sup className="fs-20" >({offers.length})</sup> </p>
                <Link to="/fizio/addoffer" className="oferta-top-btn-add  flex ai-center fs-18 fw-regular" >Shto Oferte

                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="30" height="30" viewBox="0 0 200.000000 200.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <metadata>
                            Created by potrace 1.16, written by Peter Selinger 2001-2019
                        </metadata>
                        <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                            fill="#fff" stroke="none">
                            <path d="M945 1940 c-11 -4 -54 -29 -95 -54 l-75 -46 -110 2 c-145 4 -161 -6
                    -230 -134 -50 -93 -50 -93 -127 -133 -139 -73 -161 -110 -152 -260 l6 -90 -51
                    -80 c-29 -44 -54 -90 -58 -103 -13 -51 4 -107 56 -187 l51 -80 -2 -110 c-4
                    -145 6 -161 134 -230 l93 -50 50 -94 c44 -82 57 -98 95 -118 42 -23 52 -24
                    145 -18 l100 7 80 -53 c67 -44 89 -53 135 -57 52 -3 60 -1 148 53 l93 57 97
                    -7 c89 -6 101 -4 142 17 39 20 51 35 95 118 l50 95 94 50 c83 43 98 56 119 95
                    22 42 23 52 17 145 l-6 100 50 78 c74 117 77 176 13 269 -59 87 -63 100 -60
                    216 4 142 -6 158 -134 227 -93 50 -93 50 -133 127 -73 139 -109 161 -255 152
                    l-95 -6 -65 42 c-104 68 -159 84 -215 60z m121 -116 c32 -20 74 -46 92 -57 29
                    -17 49 -20 146 -18 131 2 131 2 189 -114 42 -84 61 -102 154 -149 98 -49 104
                    -59 101 -188 l-2 -105 54 -84 c29 -46 53 -96 53 -110 0 -14 -19 -53 -42 -88
                    -67 -98 -72 -117 -65 -226 8 -114 5 -119 -101 -172 -91 -46 -110 -64 -152
                    -148 -58 -116 -58 -116 -189 -114 l-113 3 -83 -54 c-46 -29 -94 -53 -108 -53
                    -14 0 -60 23 -104 51 -83 55 -83 55 -226 52 -58 -1 -91 3 -103 12 -10 8 -39
                    54 -65 103 l-47 90 -89 46 c-49 26 -96 55 -103 65 -9 13 -13 50 -12 124 0 58
                    -3 114 -7 125 -4 11 -29 54 -56 96 -26 42 -48 83 -48 91 0 8 18 42 40 76 70
                    110 71 113 69 232 -2 80 1 113 11 125 8 9 46 33 84 52 94 46 120 73 167 165
                    21 43 48 82 59 88 11 6 65 10 123 9 112 -2 118 0 229 71 34 22 66 40 73 40 6
                    0 38 -16 71 -36z"/>
                            <path d="M744 1356 c-44 -20 -83 -75 -90 -128 -14 -100 59 -182 161 -182 67 0
                    114 27 143 84 40 78 21 160 -51 214 -34 25 -121 32 -163 12z m115 -71 c82 -42
                    48 -165 -45 -165 -79 0 -115 102 -53 154 35 30 58 32 98 11z"/>
                            <path d="M973 1028 c-172 -172 -313 -320 -313 -328 0 -20 20 -40 40 -40 20 0
                    640 620 640 641 0 19 -20 39 -39 39 -8 0 -156 -141 -328 -312z"/>
                            <path d="M1114 941 c-62 -29 -89 -73 -89 -148 0 -67 16 -98 69 -137 39 -30
                    143 -30 183 0 35 25 73 98 73 139 -1 116 -130 196 -236 146z m130 -86 c39 -36
                    37 -94 -5 -129 -35 -30 -58 -32 -98 -11 -40 20 -57 66 -41 105 26 63 96 80
                    144 35z"/>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="oferta-datatable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
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
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>{ofert.titulli}</TableCell>
                                <TableCell>{ofert.date_created}</TableCell>
                                <TableCell>{ofert.end_date}</TableCell>
                                <TableCell>{ofert.ulja}{ofert.ulja_type === 1 ? '%' : '$'}</TableCell>
                                <TableCell>
                                    <span style={{
                                        color: ofert.status === 1 ? 'black' : 'white',
                                        backgroundColor: ofert.status === 1 ? '#9BFFC3' : '#FF4848',
                                        padding: '10px 15px',
                                    }} >
                                        {ofert.status === 1 ? 'Active' : 'Expire'}
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
                                                                axios.post('http://localhost/physiosystem/server/fizio/deleteOffer',
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
                <Pagination count={Math.ceil(offers.length / itemPage)} onChange={handleChange} />
            </div>
        </div>
    )
}