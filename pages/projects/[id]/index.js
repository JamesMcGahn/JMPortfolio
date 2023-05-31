import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import classes from "../../../styles/singleProject.module.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProjectBadge from "../../../components/ui/ProjectBadge";
import ViewButton from "../../../components/ui/ViewButton";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import LinkWrapper from "../../../components/utils/LinkWrapper";
import Modal from "react-bootstrap/Modal";

function SingleProject({ project, notFound }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  //TODO: loading spinner
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return (
      <>
        <head>
          <meta name="robots" content="noindex" />
        </head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const img = (
    <a>
      <Card.Img variant="top" src="/img/headshot.jpg" />
    </a>
  );

  return (
    <Container className={classes.outerContainer} fluid>
      <Container className={classes.container} fluid>
        <Card className={classes.card}>
          <Card.Body>
            <Row>
              <Col xs={12} md={12} lg={5} className={classes.leftCol}>
                <Card className={classes.innerCard}>
                  <div onClick={() => setShow(true)}>
                    <ImgCarousel project={project} />
                  </div>
                  <div className={classes.subtitle}>
                    <strong>Summary: </strong>
                    <p>{project.subtitle}</p>
                  </div>
                  <div className={classes.buttonDiv}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ViewButton link={false}>Live Site</ViewButton>
                    </a>
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ViewButton link={false}>Code</ViewButton>
                    </a>
                  </div>
                </Card>
              </Col>
              <Col xs={12} md={12} lg={7} className={classes.rightCol}>
                <Card className={classes.innerCard}>
                  <div className={classes.title}>
                    <h4>{project.title}</h4>
                  </div>
                  <div className={classes.projectInfo}>
                    <div className={classes.tech}>
                      <strong>Tech Used:</strong>
                      {project.stack.map((tech, i) => (
                        <ProjectBadge key={i}>{tech}</ProjectBadge>
                      ))}
                    </div>
                    <div className={classes.description}>
                      <strong>Description:</strong>
                      <ReactMarkdown>{project.description}</ReactMarkdown>
                    </div>
                    <div className={classes.challenges}>
                      <strong>Challenges:</strong>
                      <ReactMarkdown>{project.challenges}</ReactMarkdown>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <div className={classes.goBackBtnDiv}>
        <LinkWrapper to="/projects">
          <ViewButton>Go Back</ViewButton>
        </LinkWrapper>
      </div>
      <DisplayModal show={show} setShow={setShow} project={project} />
    </Container>
  );
}

export default SingleProject;

import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";

export async function getStaticPaths() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/projects/`
    );
    const { data } = await res.data;
    const paths = data.map((project) => ({
      params: { id: project.slug },
    }));
    return { paths, fallback: true };
  } catch (e) {
    const paths = [];
    return { paths, fallback: true };
  }
}

export async function getStaticProps(context) {
  try {
    await dbConnect();
    const id = context.params.id;
    const project = await Project.findOne({ slug: id }).lean();
    return {
      props: { project: JSON.parse(JSON.stringify(project)), notFound: false },
      revalidate: 3600,
    };
  } catch {
    return { props: { project: [], notFound: true }, revalidate: 3600 };
  }
}

// #TODO: put in own comp
const DisplayModal = ({ show, setShow, project }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Body>
        <ImgCarousel project={project} />
      </Modal.Body>
    </Modal>
  );
};

// #TODO: put in own comp
const ImgCarousel = ({ project }) => {
  const moreThanOneImg = project.imageUrl.length > 1 ? true : false;

  return (
    <Carousel controls={moreThanOneImg} indicators={moreThanOneImg}>
      {project.imageUrl.map((img, i) => (
        <Carousel.Item key={`${i}-img`}>
          <img
            className="d-block w-100"
            src={`${img.url}`}
            alt={`${img.filename}`}
            style={{ minHeight: "200px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
