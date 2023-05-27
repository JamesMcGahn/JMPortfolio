import React from 'react';
import Button from 'react-bootstrap/Button';
import LinkWrapper from '../utils/LinkWrapper';
import classes from '../../styles/ViewButton.module.css'
function ViewButton({ link, href, children }) {
    return (
        <div className={classes.btnDiv}>
            {link ? <LinkWrapper to={href}>
                <Button variant="primary" size="lg" className={classes.view}>{children}</Button>
            </LinkWrapper>
                : <Button variant="primary" size="lg" className={classes.view}>{children}</Button>}
        </div>
    );
}

export default ViewButton;