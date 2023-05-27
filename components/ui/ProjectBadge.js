import React from 'react';
import Badge from 'react-bootstrap/Badge';
import classes from '../../styles/projectBadge.module.css'

function ProjectBadge(props) {
    return (
        <Badge bg="primary" className={classes.badge} >{props.children}</Badge>
    );
}

export default ProjectBadge;