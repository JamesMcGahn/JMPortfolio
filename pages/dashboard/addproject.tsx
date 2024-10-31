import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import classes from '../../styles/addproject.module.css';
import ProjectForm, {
  FieldChange,
  FormState,
} from '../../components/dashboard/ProjectForm';
import Loading from '../../components/ui/Loading';

function AddProject() {
  const [form, setForm] = useState<FormState>({
    title: '',
    subtitle: '',
    mainPage: false,
    stack: [],
    description: '',
    challenges: '',
    imageUrl: [],
    gitUrl: '',
    liveUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const createProject = async () => {
    setSubmitting(true);
    const sendForm = new FormData();

    sendForm.append('title', form.title);
    sendForm.append('mainPage', JSON.stringify(form.mainPage));
    sendForm.append('subtitle', form.subtitle);
    sendForm.append('stack', JSON.stringify(form.stack));
    sendForm.append('description', form.description);
    sendForm.append('challenges', form.challenges);
    form.imageUrl.forEach((file) => sendForm.append('imageUrl', file));

    sendForm.append('gitUrl', form.gitUrl);
    sendForm.append('liveUrl', form.liveUrl);
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/projects`, sendForm, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          setSubmitting(false);
          router.push(`/projects/${res.data.project}`);
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
      createProject();
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

  return (
    <div className={classes.addform}>
      <Card className={classes.card}>
        <Row md="12">
          {submitting ? (
            <Loading />
          ) : (
            <ProjectForm
              validated={validated}
              handleSubmit={handleSubmit}
              handleEditor={handleEditor}
              handleChange={handleChange}
              form={form}
              edit={false}
            />
          )}
        </Row>
      </Card>
    </div>
  );
}

export default AddProject;

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
  return { props: { session: session } };
};
