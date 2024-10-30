import React from 'react';

import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import LinkWrapper from '../components/utils/LinkWrapper';
import classes from '../styles/error.module.css';

function FourOneFourPage() {
  const router = useRouter();
  return (
    <div className={classes.error}>
      <div className={classes.message}>
        <h1>
          Ohhh...no... Page Not Found</h1>
        <h4>Are You Sure You Are Supposed to Be Here?</h4>
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

export default FourOneFourPage;