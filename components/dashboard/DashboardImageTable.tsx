import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import classes from '../../styles/dashBoardImageTable.module.css';
import { Art } from '../../interfaces/art';

interface Props {
  art: Art[];
  handleDelete: (id: string, title: string, type: 'project' | 'image') => void;
}

function DashboardImageTable({ art, handleDelete }: Props) {
  const handleModalDelete = (id: string, title: string) => {
    handleDelete(id, title, 'image');
  };

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
        {art.map((artPiece) => (
          <tr className="d-flex" key={artPiece.title}>
            <td className="col-4">
              <div className={classes.img}>
                <Image
                  src={artPiece.imageUrl[0].url}
                  thumbnail
                  alt="project image"
                />
              </div>
            </td>
            <td className="col-4">{artPiece.title}</td>

            <td className="col-4">
              <div className={classes.btnDiv}>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleModalDelete(artPiece._id, artPiece.title)
                  }
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DashboardImageTable;
