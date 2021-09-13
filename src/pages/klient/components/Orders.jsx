import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import ClientContext from '../../../context/klient/klientContext';


export default function Orders() {

    const clientContext = useContext(ClientContext)
    const { getMyPackages, mypackages } = clientContext;
    const [page, setPage] = useState(1);
    const [itemPage, setItempage] = useState(10);
    const start = (page - 1) * itemPage;
    const end = page * itemPage;
    useEffect(() => {
        getMyPackages()
    }, [])

    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div className="orders" >
            <div className="orders-header flex ai-center jc-spaceb">
                <p className="orders-header-title fs-38 fw-semib">Orders</p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>


            <div className="orders-datatable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Package</TableCell>
                            <TableCell>Bought Day</TableCell>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mypackages && mypackages.slice(start, end).map((item, index) => (
                            <TableRow>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>{item.packages[0].name}</TableCell>
                                <TableCell>{item.bought_at}</TableCell>
                                <TableCell>{item.expires_at}</TableCell>
                                <TableCell> {item.price_bought} $</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="pagination flex jc-end">
                <Pagination count={Math.ceil(mypackages.length / itemPage)} size="medium" onChange={handleChange} />
            </div>

        </div>
    )
}
