import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import classes from '../../styles/dashBoardImageTable.module.css'
import Image from 'react-bootstrap/Image';

function DashboardImageTable({ art, handleDelete }) {
    const handleModalDelete = (id, title) => {
        handleDelete(id, title, 'image')
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr className="d-flex">
                    <th className="col-4">Image</th>
                    <th className="col-4">Name</th>

                    <th className="col-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {art.map(art => (
                    <tr className="d-flex" key={art.title}>
                        <td className="col-4"> <div className={classes.img}><Image variant="top" src={art.imageUrl[0].url} thumbnail alt="project image" /></div></td>
                        <td className="col-4">{art.title}</td>

                        <td className="col-4">
                            <div className={classes.btnDiv}>
                                <Button variant="danger" onClick={() => handleModalDelete(art._id, art.title)}>
                                    Delete
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table >
    );
}

export default DashboardImageTable;

