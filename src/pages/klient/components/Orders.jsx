import React from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';



export default function Orders() {
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
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>Total Body</TableCell>
                            <TableCell>12/8/2021</TableCell>
                            <TableCell>20/09/2021</TableCell>
                            <TableCell>30$</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className="pagination flex jc-end">
                <Pagination count={30} />
            </div>

        </div>
    )
}
