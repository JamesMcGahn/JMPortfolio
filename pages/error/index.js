import React from 'react';
import Button from 'react-bootstrap/Button';
import classes from '../../styles/error.module.css';
import LinkWrapper from '../../components/utils/LinkWrapper';

function Error() {
  return (
    <div className={classes.error}>
      <div className={classes.message}>
        <h1>Access Denied</h1>
        <h4>Are You Sure You Are Supposed to Be Here?</h4>
        <div className={classes.btnDiv}>
          <LinkWrapper to="/">
            <Button id={classes.home}>Home</Button>
          </LinkWrapper>
          <LinkWrapper to="/dashboard/login">
            <Button>Try Again?</Button>
          </LinkWrapper>
        </div>
      </div>
    </div>
  );
}

export default Error;
