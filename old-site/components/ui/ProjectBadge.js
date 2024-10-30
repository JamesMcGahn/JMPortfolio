import React from 'react';
import Badge from 'react-bootstrap/Badge';
import classes from '../../styles/projectBadge.module.css';

function ProjectBadge({ children }) {
  return (
    <Badge bg="primary" className={classes.badge}>
      {children}
    </Badge>
  );
}

export default ProjectBadge;
