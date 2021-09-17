import React, { useContext, useEffect, useState } from 'react'
import FizioContext from '../../../context/fizioterapist/FizioContext'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';

export default function Porosit() {

    const fizioContext = useContext(FizioContext);
    const { orders, getOrders } = fizioContext;
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
            <div className="orders" >
                <div className="orders-top flex ai-center jc-spaceb">
                    <p className="orders-top-title fs-30 fw-medium">Porosit <sup className="fs-20" >({orders.length})</sup> </p>
                    <div className="header-search flex ai-center">
                        <Search />
                        <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className="orders-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Klient</TableCell>
                                <TableCell>Package</TableCell>
                                <TableCell>Bought at</TableCell>
                                <TableCell>Expires at</TableCell>
                                <TableCell>Price Bought</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.slice(start, end).map((order, index) => (
                                <TableRow>
                                    <TableCell>#{index + 1}</TableCell>
                                    <TableCell>{order.user}</TableCell>
                                    <TableCell>{order.package}</TableCell>
                                    <TableCell>{order.bought_at}</TableCell>
                                    <TableCell>{order.expires_at}</TableCell>
                                    <TableCell>{order.price_bought} $</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="oferta-datatable-pagination flex jc-end">
                    <Pagination count={Math.ceil(orders.length / itemPage)} onChange={handleChange} />
                </div>
            </div>
        </>
    )
}