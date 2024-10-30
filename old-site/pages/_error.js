import React from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import LinkWrapper from '../components/utils/LinkWrapper';
import classes from '../styles/error.module.css';

function DefaultErrorPage({ statusCode }) {
  const router = useRouter();
  return (
    <div className={classes.error}>
      <div className={classes.message}>
        <h1>
          Ohhh...no...
          {statusCode === 404 ? 'Page Not Found' : 'an Error Occurred'}
        </h1>
        <h4>
          {statusCode === 404
            ? 'Are You Sure You Are Supposed to Be Here?'
            : 'Try again later. '}
        </h4>
        <div className={classes.btnDiv}>
          <LinkWrapper to="/">
            <Button id={classes.home}>Home</Button>
          </LinkWrapper>
          <Button onClick={() => router.push(router.asPath)}>Try Again?</Button>
        </div>
      </div>
    </div>
  );
}

DefaultErrorPage.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default DefaultErrorPage;
