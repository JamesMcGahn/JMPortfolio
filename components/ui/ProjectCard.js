import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import ProjectBadge from './ProjectBadge';
import classes from '../../styles/projectsSection.module.css';

function ProjectCard({ stack, description, title, id }) {
  const img = <Card.Img variant="top" src="/img/headshot.jpg" />;

  return (
    <Col xs={12} md={4} className={classes.projectTile} key={id}>
      <Card className={classes.bioBlurb}>
        <Link href={`/projects/${id}`}>{img}</Link>
        <Card.Body>
          <span className={classes.title}>
            <h5>
              <Link href={`/projects/${id}`}>{title}</Link>
            </h5>
          </span>
          <div>
            Tech:
            {stack?.map((tech, i) => (
              // trunk-ignore(eslint/react/no-array-index-key)
              <ProjectBadge key={`${tech}-${i}`}>{tech}</ProjectBadge>
            ))}
          </div>
          <div>{description}</div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProjectCard;
