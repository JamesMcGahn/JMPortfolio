import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import classes from '../../styles/art.module.css'
import Image from 'next/image';
import BootImage from 'react-bootstrap/Image'
import PageHead from '../../components/layout/PageHead'

function ArtPage({ art }) {
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState({ title: '', img: '' });

    const handleClick = (title, img) => {
        console.log(title, img)
        setModalItem({ title: title, img: img })
        setShow(true)

    }

    return (
        <Container className={classes.art} id="projects" fluid>
            <PageHead title='James McGahn | Art' />
            <div className={classes.header}><h2>Art.</h2></div>
            <div className={classes.artDiv}>

                <Row id={classes.cardRow}>
                    {art.reverse().map((art, i) => {

                        return (
                            <Col xs={12} md={6} lg={4} className={classes.projectTile} key={art._id} >
                                <Card className={classes.projectCard} onClick={() => handleClick(art.title, art.imageUrl[0].url)}>
                                    <div className={classes.projectImg}>
                                        <Image variant="top" src={art.imageUrl[0].url} layout='fill' alt={art.title} />
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div >
            <DisplayModal title={modalItem.title} img={modalItem.img} show={show} setShow={setShow} />
        </Container >
    );
}

export default ArtPage;


import dbConnect from '../../utils/dbConnect'
import Art from "../../models/Art"
export const getStaticProps = async (context) => {
    await dbConnect()
    const art = await Art.find({}).lean();
    return { props: { art: JSON.parse(JSON.stringify(art)) }, revalidate: 3600 }
}

const DisplayModal = ({ img, title, show, setShow, }) => {
    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BootImage variant="top" src={`${img}`} fluid alt={title} />
            </Modal.Body>
        </Modal >
    )
}