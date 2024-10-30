import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'next/legacy/image';
import BootImage from 'react-bootstrap/Image';
import PageHead from '../../components/layout/PageHead';
import classes from '../../styles/art.module.css';
import dbConnect from '../../utils/dbConnect';
import Art from '../../models/Art';
import DisplayModal from '../../components/ui/DisplayModal';

function ArtPage({ art }) {
  const [show, setShow] = useState(false);
  const [modalItem, setModalItem] = useState({ title: '', img: '' });

  const handleClick = (title, img) => {
    setModalItem({ title: title, img: img });
    setShow(true);
  };

  return (
    <Container className={classes.art} id="projects" fluid>
      <PageHead title="James McGahn | Art" />
      <div className={classes.header}>
        <h2>Art.</h2>
      </div>
      <div className={classes.artDiv}>
        <Row id={classes.cardRow}>
          {art.map((artP) => {
            return (
              <Col
                xs={12}
                md={6}
                lg={4}
                className={classes.projectTile}
                key={artP._id}
              >
                <Card
                  className={classes.projectCard}
                  onClick={() => handleClick(artP.title, artP.imageUrl[0].url)}
                >
                  <div className={classes.projectImg}>
                    <Image
                      variant="top"
                      src={artP.imageUrl[0].url}
                      layout="fill"
                      alt={artP.title}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <DisplayModal title={modalItem.title} show={show} setShow={setShow}>
        <BootImage
          variant="top"
          src={`${modalItem.img}`}
          fluid
          alt={modalItem.title}
        />
      </DisplayModal>
    </Container>
  );
}

export default ArtPage;
export const getStaticProps = async () => {
  await dbConnect();
  const art = await Art.find({}).lean();
  return { props: { art: JSON.parse(JSON.stringify(art)) }, revalidate: 3600 };
};
