import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import ClientContext from '../../../context/klient/klientContext';


export default function Orders() {

    const clientContext = useContext(ClientContext)
    const { getOrders, orders, expireMyPackage } = clientContext;
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const itemPage = 10;
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    useEffect(() => {
        getOrders()
        expireMyPackage()
    }, [])

    const handleChange = (event, value) => {
        setPage(value);
    };
    var packageFiltered = orders.filter((order) =>
        order.packages[0].name.toLowerCase().includes(search.toLowerCase()) ||
        order.bought_at.toLowerCase().includes(search.toLowerCase()) ||
        order.expires_at.toLowerCase().includes(search.toLowerCase()) ||
        order.price_bought.toString().toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="orders" >
            <div className="orders-header flex ai-center jc-spaceb">
                <p className="orders-header-title fs-38 fw-semib">Orders</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }} />
                </div>
            </div>

            {orders.length !== 0 ?
                <div className="orders-datatable">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Package</TableCell>
                                <TableCell>Bought Day</TableCell>
                                <TableCell>Expire Date</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && packageFiltered.slice(start, end).map((item, index) => (
                                <TableRow key={item.id} >
                                    <TableCell>{item.packages[0].name}</TableCell>
                                    <TableCell>{item.bought_at}</TableCell>
                                    <TableCell>{item.expires_at}</TableCell>
                                    <TableCell> {item.price_bought} €</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                :
                <div className="orders-empty flex ai-start fd-column">
                    <p className='fs-28 fw-medium' >You have no orders yet!</p>
                    <Link className='fs-16 fw-regular' to='/shop' >Make your first order</Link>
                </div>

            }
            {orders.length !== 0 && <div className="pagination flex jc-end">
                <Pagination count={Math.ceil(packageFiltered.length / itemPage)} size="medium" onChange={handleChange} page={page} />
            </div>}
        </div>
    )
}
