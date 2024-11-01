import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import classes from '../../styles/RegLogSignForm.module.css';
import MailerForm from '../../components/forms/MailerForm';
import Loading from '../../components/ui/Loading';
import PageHead from '../../components/layout/PageHead';

function ContactPage() {
  const [validated, setValidated] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  async function onChange(value: string | null) {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/api/captcha`, {
          headers: { 'Content-Type': 'application/json' },
          data: {
            response: value,
          },
        })
        .then((res) => {
          setCaptcha(res.data.captcha);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false || captcha === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        setLoading(true);
        await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER}/api/mailer`, {
            headers: { 'Content-Type': 'application/json' },
            data: form,
          })
          .then((res) => {
            setLoading(false);
            if (res.data.mailer === 200) {
              setSuccess(true);
              setForm({
                user_name: '',
                user_email: '',
                subject: '',
                message: '',
              });
              setCaptcha(false);
              window.scrollTo(0, 0);
            } else if (res.data.mailer === 400) {
              setLoading(false);
              setError(true);
            }
          });
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.formDiv}>
      <PageHead title="James McGahn | Contact" />
      <h1>Contact</h1>
      {success ? (
        <span className={classes.success}>Successfully Submitted</span>
      ) : null}
      {error ? (
        <span className={classes.success}>
          Opps...Looks Like There Was An Error
        </span>
      ) : null}
      {loading ? (
        <Loading color="#ffffff" />
      ) : (
        <MailerForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          validated={validated}
        >
          <div className={classes.captcha}>
            <ReCAPTCHA
              // trunk-ignore(gitleaks/generic-api-key)
              sitekey="6Lc55RkUAAAAAOPJdIsuhK5bnstiQD8H3t9rV_ml"
              // eslint-disable-next-line
              onChange={onChange}
              size="compact"
              theme="dark"
            />
            {!captcha ? (
              <div className={classes.captchaMessage}>Fill out captcha</div>
            ) : null}
          </div>
        </MailerForm>
      )}
    </div>
  );
}

export default ContactPage;
