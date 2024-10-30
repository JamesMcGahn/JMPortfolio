import React from 'react';
import Button from 'react-bootstrap/Button';
import LinkWrapper from '../utils/LinkWrapper';
import classes from '../../styles/ViewButton.module.css';

interface Props {
  link?: boolean;
  href?: string;
  children: React.ReactNode;
}

function ViewButton({ link, href, children }: Props) {
  return (
    <div className={classes.btnDiv}>
      {link && href ? (
        <LinkWrapper to={href}>
          <Button variant="primary" size="lg" className={classes.view}>
            {children}
          </Button>
        </LinkWrapper>
      ) : (
        <Button variant="primary" size="lg" className={classes.view}>
          {children}
        </Button>
      )}
    </div>
  );
}

export default ViewButton;
