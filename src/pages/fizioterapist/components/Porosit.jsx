import React, { useContext, useEffect, useState } from 'react'
import FizioContext from '../../../context/fizioterapist/FizioContext'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

export default function Porosit() {

    const fizioContext = useContext(FizioContext);
    const { orders, getOrders } = fizioContext;
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    const handleChange = (event, value) => {
        setPage(value);
    };
    const [propertyName, setProperty] = useState({
        key: 'user',
        direction: 'ascending'
    });

    useEffect(() => {
        getOrders()
    }, [])

    const orderFiltered = orders.filter(
        (order) =>
            order.user.toLowerCase().includes(search.toLowerCase()) ||
            order.package.toLowerCase().includes(search.toLowerCase()) ||
            order.bought_at.toLowerCase().includes(search.toLowerCase()) ||
            order.expires_at.toString().toLowerCase().includes(search.toLowerCase()) ||
            order.price_bought.toString().toLowerCase().includes(search.toLowerCase())
    );


    if (propertyName !== null) {
        orderFiltered.sort((a, b) => {
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
        <>
            <div className="orders" >

                {orders.length !== 0 ?
                    <>
                        <div className="orders-top flex ai-center jc-spaceb">
                            <p className="orders-top-title fs-30 fw-medium">Porosit <sup className="fs-20" >({orders.length})</sup> </p>
                            <div className="header-search flex ai-center">
                                <Search />
                                <input className="fs-16 fw-regular" type="text" placeholder="Search..." onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }} />
                            </div>
                        </div>
                        <div className="orders-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell onClick={() => requestSort('user')}>
                                            Klient
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
                                        <TableCell onClick={() => requestSort('package')}  >
                                            Package
                                            {propertyName.key === 'package' &&
                                                propertyName.direction === 'ascending' && (
                                                    <ArrowUpwardOutlinedIcon
                                                        style={{ fontSize: '17px' }}
                                                    />
                                                )}
                                            {propertyName.key === 'package' &&
                                                propertyName.direction === 'descending' && (
                                                    <ArrowDownwardOutlinedIcon
                                                        style={{ fontSize: '17px' }}
                                                    />
                                                )}
                                        </TableCell>
                                        <TableCell onClick={() => requestSort('bought_at')} >Bought at

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
                                        <TableCell onClick={() => requestSort('expires_at')}>Expires at
                                            {propertyName.key === 'expires_at' &&
                                                propertyName.direction === 'ascending' && (
                                                    <ArrowUpwardOutlinedIcon
                                                        style={{ fontSize: '17px' }}
                                                    />
                                                )}
                                            {propertyName.key === 'expires_at' &&
                                                propertyName.direction === 'descending' && (
                                                    <ArrowDownwardOutlinedIcon
                                                        style={{ fontSize: '17px' }}
                                                    />
                                                )}
                                        </TableCell>
                                        <TableCell onClick={() => requestSort('price_bought')}>Price Bought
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderFiltered.slice(start, end).map((order, index) => (
                                        <TableRow>
                                            <TableCell>{order.user}</TableCell>
                                            <TableCell>{order.package}</TableCell>
                                            <TableCell>{order.bought_at}</TableCell>
                                            <TableCell>{order.expires_at}</TableCell>
                                            <TableCell>{order.price_bought} €</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="oferta-datatable-pagination flex jc-end">
                            <Pagination count={Math.ceil(orderFiltered.length / itemPage)} onChange={handleChange} page={page} />
                        </div>
                    </>
                    :
                    <div className='porosi-empty' >
                        <p className='fs-28 fw-medium' style={{ color: 'white' }} >Lista e porosive eshte 0</p>
                    </div>
                }
            </div>
        </>
    )
}