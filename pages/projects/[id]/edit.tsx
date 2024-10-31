import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import classes from '../../../styles/addproject.module.css';
import ProjectForm, {
  FieldChange,
} from '../../../components/dashboard/ProjectForm';
import Loading from '../../../components/ui/Loading';
import { Project as ProjectType } from '../../../interfaces/project';

interface Props {
  project: ProjectType;
}

function EditSingleProject({ project }: Props) {
  const [form, setForm] = useState(project);
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const editProjectSubmit = async () => {
    setSubmitting(true);
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER}/api/projects/${project._id}`,
          form,
        )
        .then(() => {
          setSubmitting(false);
          router.push(router.asPath);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      editProjectSubmit();
    }
  };

  const handleEditor = (editorField: FieldChange) => {
    if (editorField?.name) {
      setForm((prev) => ({
        ...prev,
        [editorField.name]: editorField.value,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imageUrl' || e.target.name === 'adtlImg') {
      if (e.target.files) {
        setForm({ ...form, [e.target.name]: [...e.target.files] });
      }
    } else if (e.target.name === 'mainPage') {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else if (e) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  if (submitting) {
    return (
      <div className={classes.addform}>
        <Card className={classes.card}>
          <Loading />
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.addform}>
      <Card className={classes.card}>
        <Row md="12">
          <ProjectForm
            validated={validated}
            handleSubmit={handleSubmit}
            handleEditor={handleEditor}
            handleChange={handleChange}
            form={form}
            edit
          />
        </Row>
      </Card>
    </div>
  );
}

export default EditSingleProject;

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
  const { id } = context.query;
  const res = await axios.get(`${process.env.SERVER}/api/projects/${id}`);
  const { data } = await res.data;
  return { props: { session: session, project: data } };
};
