import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import FizioContext from '../../../context/fizioterapist/FizioContext'
import LoadingContext from '../../../context/loading/LoadingContext'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CSVLink } from 'react-csv'
import { Switch } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

export default function Raporte() {

    const headers = [
        { label: "Paketa", key: "paket" },
        { label: "Cmimi Blerjes", key: "price_bought" },
        { label: "Klienti", key: "user" },
        { label: "Email", key: "email" },
        { label: "Data e Blerjes", key: "bought_at" }

    ];

    let date = new Date()
    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const fizioContext = useContext(FizioContext)
    const { getPackages, packages } = fizioContext
    const [raporte, setRaporte] = useState([])
    const [dataFillimi, setDataFillimit] = useState(date.toISOString().substring(0, 10))
    const [dataMbarimit, setDataMbarimit] = useState(date.toISOString().substring(0, 10))
    const [paketat, setPaketat] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    const [propertyName, setProperty] = useState({
        key: '',
        direction: 'ascending'
    });
    if (propertyName !== null) {
        raporte.sort((a, b) => {
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

    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        getPackages()
    }, [])

    const gjeneroRaport = () => {
        setShow(true)
        setRaporte([])
        axios.post('https://physiosystem.alcodeit.com/fizio/generateReport', { dataFillimi, dataMbarimit, paketat }).then(res => {
            if (res.data.length === 0) {
                setShow(false)
                alert('Nuk gjetem dot te dhena per keto dite ose paket')
            } else {
                setRaporte(res.data)
                setShow(false)
            }
        })
    }

    return (
        <div className='raporte flex fd-column ai-start' >
            <p className='raporte-title fs-32 fw-medium' >Gjenero Raport</p>
            <div className="raporte-inputs flex ai-center ">
                <div className="raporte-inputs-item flex fd-column ai-start">
                    <label className='fs-18 fw-regular' htmlFor="#">Data Fillimit</label>
                    <input className='fs-18 fw-regular' max={date.toISOString().substring(0, 10)} type="date" value={dataFillimi} onChange={(e) => setDataFillimit(e.target.value)} />
                </div>
                <div className="raporte-inputs-item flex fd-column ai-start">
                    <label className='fs-18 fw-regular' htmlFor="#">Data Mbarimit</label>
                    <input className='fs-18 fw-regular' max={date.toISOString().substring(0, 10)} type="date" value={dataMbarimit} onChange={(e) => setDataMbarimit(e.target.value)} />
                </div>
            </div>
            <div className="raporte-paketat flex fd-column ai-start">
                <div className='flex ai-center'>
                    <p className='fs-22 fw-medium' > Zgjidh paketat</p>
                    <p className='fs-18 fw-regular' >Te gjitha <Switch color='secondary' checked={showAll} onChange={() => setShowAll(!showAll)} /></p>

                </div>
                {!showAll &&
                    <div className="raporte-paketat-items">
                        {packages && packages.map(item => (
                            <label htmlFor={item.id}>
                                <input type="checkbox" name="" id={item.id} value={item.id} onChange={(e) => {
                                    if (e.target.checked) {
                                        setPaketat(prev => [...prev, parseInt(e.target.value)])
                                    } else {
                                        setPaketat(paketat.filter(item => item !== parseInt(e.target.value)))
                                    }
                                }} />
                                {item.titulli}
                            </label>
                        ))}
                    </div>
                }
            </div>
            <button onClick={gjeneroRaport} className='raporte-button fs-18 fw-regular'>Gjenero</button>
            {raporte.length !== 0 &&
                <>
                    <CSVLink headers={headers} data={raporte} className="raporte-datatable-btn flex ai-center fs-18 fw-regular" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.864" height="17.859" viewBox="0 0 18.864 17.859">
                            <defs>
                                <radialGradient id="radial-gradient" cx="0.002" cy="0.5" r="0.39" gradientTransform="translate(-0.125 -0.461) scale(1.661 1.921)" gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#237f4c" />
                                    <stop offset="1" stop-color="#1e6c41" />
                                </radialGradient>
                            </defs>
                            <g id="Microsoft_Excel_Logo__2013-2019_" data-name="Microsoft_Excel_Logo_(2013-2019)" transform="translate(-4.469 -9.063)">
                                <rect id="rect4556" width="17.669" height="13.857" rx="3.375" transform="translate(5.399 11.016)" fill="#fff" />
                                <g id="use3985" transform="translate(14.646 10.836)">
                                    <path id="rect3991" d="M103.355-49.932h3.014v1.548h-3.014Zm3.632,0H110v1.545h-3.014Zm-3.632-2.244h3.014v1.622h-3.014Zm3.632,0H110v1.622h-3.014Zm-3.632-2.241h3.014v1.622h-3.014Zm3.632,0H110v1.622h-3.014Zm-3.632-2.241h3.014v1.622h-3.014Zm3.632,0H110v1.622h-3.014ZM103.355-58.9h3.014v1.622h-3.014Zm3.632,0H110v1.622h-3.014Zm-3.737-1.852v.615h8.065v13.062H103.25v.618h8.014a.673.673,0,0,0,.673-.673V-60.078a.673.673,0,0,0-.673-.673H103.25Z" transform="translate(-103.25 60.751)" fill="#1f7144" />
                                </g>
                                <path id="path3945" d="M15.222,9.063,4.469,10.975V24.98l10.747,1.941Zm-3.439,5.763-1.539,3.165,1.581,3.184-1.43-.084-.94-2.331-.921,2.225-1.259-.071,1.478-2.923-1.4-2.956,1.362-.064L9.5,17.124l.953-2.238Z" fill="url(#radial-gradient)" />
                            </g>
                        </svg>
                        Shkarko Excel
                    </CSVLink>
                    <div className='raporte-datatable'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => requestSort('paket')} >Paketa
                                        {propertyName.key === 'paket' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'paket' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('price_bought')}>Cmimi Blerjes
                                        {propertyName.key === 'price_bought' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'price_bought' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                    <TableCell onClick={() => requestSort('user')}>Klienti
                                        {propertyName.key === 'user' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'user' &&
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
                                    <TableCell onClick={() => requestSort('bought_at')}>Data e Blerjes
                                        {propertyName.key === 'bought_at' &&
                                            propertyName.direction === 'ascending' && (
                                                <ArrowUpwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                        {propertyName.key === 'bought_at' &&
                                            propertyName.direction === 'descending' && (
                                                <ArrowDownwardOutlinedIcon
                                                    style={{ fontSize: '17px' }}
                                                />
                                            )}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {raporte.slice(start, end).map((item, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{item.paket}</TableCell>
                                        <TableCell>{item.price_bought} ???</TableCell>
                                        <TableCell>{item.user}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.bought_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="oferta-datatable-pagination flex jc-end">
                        <Pagination count={Math.ceil(raporte.length / itemPage)} onChange={handleChange} page={page} />
                    </div>
                </>
            }
        </div>
    )
}
