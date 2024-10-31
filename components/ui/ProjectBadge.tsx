import React from 'react';
import Badge from 'react-bootstrap/Badge';
import classes from '../../styles/projectBadge.module.css';

interface Props {
  children: React.ReactNode;
}

function ProjectBadge({ children }: Props) {
  return (
    <Badge bg="primary" className={classes.badge}>
      {children}
    </Badge>
  );
}

export default ProjectBadge;
