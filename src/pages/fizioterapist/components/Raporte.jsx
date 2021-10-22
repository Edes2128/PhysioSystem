import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import FizioContext from '../../../context/fizioterapist/FizioContext'
import LoadingContext from '../../../context/loading/LoadingContext'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Raporte() {
    let date = new Date()
    const loadingContext = useContext(LoadingContext)
    const { setShow } = loadingContext
    const fizioContext = useContext(FizioContext)
    const { getPackages, packages } = fizioContext
    const [raporte, setRaporte] = useState([])
    const [dataFillimi, setDataFillimit] = useState(date.toISOString().substring(0, 10))
    const [dataMbarimit, setDataMbarimit] = useState(date.toISOString().substring(0, 10))
    const [paketat, setPaketat] = useState([])

    useEffect(() => {
        getPackages()
    }, [])

    const gjeneroRaport = () => {
        if (paketat.length === 0) {
            alert('Duhet te zgjidhni te pakten 1 paket')
        } else {
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
    }

    console.log(raporte)

    return (
        <div className='raporte flex fd-column ai-start' >
            <p className='raporte-title fs-32 fw-medium' >Gjenero Raport</p>
            <div className="raporte-inputs flex ai-center ">
                <div className="raporte-inputs-item flex fd-column ai-start">
                    <label className='fs-18 fw-regular' htmlFor="#">Data Fillimit</label>
                    <input className='fs-18 fw-regular' type="date" value={dataFillimi} onChange={(e) => setDataFillimit(e.target.value)} />
                </div>
                <div className="raporte-inputs-item flex fd-column ai-start">
                    <label className='fs-18 fw-regular' htmlFor="#">Data Mbarimit</label>
                    <input className='fs-18 fw-regular' type="date" value={dataMbarimit} onChange={(e) => setDataMbarimit(e.target.value)} />
                </div>
            </div>
            <div className="raporte-paketat flex fd-column ai-start">
                <p className='fs-22 fw-medium' > Zgjidh paketat</p>
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
            </div>
            <button onClick={gjeneroRaport} className='raporte-button fs-18 fw-regular'>Gjenero</button>
            {raporte.length !== 0 &&
                <div className='raporte-datatable'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Paketa</TableCell>
                                <TableCell>Cmimi Blerjes</TableCell>
                                <TableCell>Klienti</TableCell>
                                <TableCell>Data e Blerjes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {raporte.map(item => (
                                <TableRow>
                                    <TableCell>{item.paket}</TableCell>
                                    <TableCell>{item.price_bought}</TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>{item.bought_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
        </div>
    )
}
