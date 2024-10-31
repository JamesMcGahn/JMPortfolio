import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from '../../styles/dashboard.module.css';
import DashboardProjectTable from '../../components/dashboard/DashboardProjectTable';
import DashboardImageTable from '../../components/dashboard/DashboardImageTable';
import { Project } from '../../interfaces/project';
import { Art } from '../../interfaces/art';

interface DeleteModalProps {
  id: string;
  title: string;
  type: 'project' | 'image';
  show: boolean;
  setShow: (n: boolean) => void;
  deleteProject: (id: string, type: 'project' | 'image') => void;
}

function DeleteModal({
  id,
  title,
  type,
  show,
  setShow,
  deleteProject,
}: DeleteModalProps) {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Delete ${title}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to delete this Project ${title}`}
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
}

interface Props {
  projects: Project[];
  art: Art[];
}

interface ModalItemProps {
  id: string;
  title: string;
  type: 'project' | 'image';
}

function Dashboard({ projects, art }: Props) {
  const [show, setShow] = useState(false);
  const [modalItem, setModalItem] = useState<ModalItemProps>({
    id: '',
    title: '',
    type: 'project',
  });
  const router = useRouter();

  const handleDelete = (
    id: string,
    title: string,
    type: 'project' | 'image',
  ) => {
    setShow(true);
    setModalItem({ id: id, title: title, type: type });
  };

  const deleteProject = async (id: string, type: 'project' | 'image') => {
    try {
      setShow(false);
      const path = type === 'project' ? 'projects' : 'art';

      await axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER}/api/${path}/${id}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
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
