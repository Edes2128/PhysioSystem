import React, { useEffect, useContext } from 'react'
import { ReactComponent as Search } from '../../../images/loupe.svg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FizioContext from '../../../context/fizioterapist/FizioContext';
import Pagination from '@material-ui/lab/Pagination';

export default function Klientet() {

    const fizioContext = useContext(FizioContext);
    const { clients, getClients } = fizioContext;
    useEffect(() => {
        getClients()
    }, [])

    return (
        <div className="klientet flex fd-column ai-start">

            <div className="klientet-top flex ai-center jc-spaceb">
                <p className="klientet-top-title fs-30 fw-medium" >Klientet <sup className="fs-20">({clients.length})</sup></p>
                <div className="header-search flex ai-center">
                    <Search />
                    <input className="fs-16 fw-regular" type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="klientet-datatable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Veprime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client, index) => (
                            <TableRow>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell> {client.email} </TableCell>
                                <TableCell>{client.contry}</TableCell>
                                <TableCell>{client.city}</TableCell>
                                <TableCell>{client.postal_code}</TableCell>
                                <TableCell>Veprime</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="oferta-datatable-pagination flex jc-end">
                <Pagination count={5} />
            </div>
        </div>
    )
}
