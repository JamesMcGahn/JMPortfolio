import React, { useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classes from "../../styles/dashboard.module.css";
import DashboardProjectTable from "../../components/dashboard/DashboardProjectTable";
import DashboardImageTable from "../../components/dashboard/DashboardImageTable";

function Dashboard({ projects, art }) {
  const [show, setShow] = useState(false);
  // const [displayProjects, setdisplayProjects] = useState(projects);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalItem, setModalItem] = useState({ id: "", title: "", type: "" });
  const router = useRouter();

  const handleDelete = (id, title, type) => {
    setShow(true);
    setModalItem({ id: id, title: title, type: type });
  };

  const deleteProject = async (id, type) => {
    try {
      setShow(false);
      const path = type === "project" ? "projects" : "art";

      const res = await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/${path}/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          router.replace(router.asPath);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className={classes.container} fluid>
      <div className={classes.table}>
        <Card>
          <DashboardProjectTable
            projects={projects}
            handleDelete={handleDelete}
          />
        </Card>
      </div>
      <div className={classes.imgTable}>
        <Card>
          <DashboardImageTable art={art} handleDelete={handleDelete} />
        </Card>
      </div>
      <DeleteModal
        id={modalItem.id}
        title={modalItem.title}
        type={modalItem.type}
        show={show}
        setShow={setShow}
        deleteProject={deleteProject}
      />
    </Container>
  );
}
export default Dashboard;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await axios.get(`${process.env.SERVER}/api/projects/`);
  const { data } = await res.data;
  const artRes = await axios.get(`${process.env.SERVER}/api/art/`);
  const art = await artRes.data.data;
  return { props: { session: session, projects: data, art: art } };
};

const DeleteModal = ({ id, title, type, show, setShow, deleteProject }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this Project {title}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => deleteProject(id, type)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
