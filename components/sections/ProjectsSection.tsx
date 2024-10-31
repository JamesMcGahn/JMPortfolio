import React, { useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ProjectBadge from '../ui/ProjectBadge';
import ViewButton from '../ui/ViewButton';
import classes from '../../styles/projectsSection.module.css';
import LinkWrapper from '../utils/LinkWrapper';
import stackOptions from '../../constants/projectStackOpts';
import { Project } from '../../interfaces/project';

interface Props {
  projects: Project[];
  mainPage: boolean;
}

function ProjectsSection({ projects, mainPage }: Props) {
  const reverse = [...projects].reverse();
  const initialProjects = mainPage
    ? projects.filter((project, i) => (i <= 2 ? project : null)).reverse()
    : reverse;
  const [projectData, setProjectData] = useState(initialProjects);

  function handleChange(val: string) {
    if (val === 'all') return setProjectData(initialProjects);

    const data = projects
      .filter((project) => project.stack.includes(val))
      .reverse();
    return setProjectData(data);
  }

  function truncateString(str: string) {
    if (str.length < 200) return str;
    return `${str.substring(0, 200)}...`;
  }

  const options = stackOptions;

  return (
    <Container className={classes.projects} id="projects" fluid>
      <div className={classes.header}>
        <h2>Projects.</h2>
      </div>
      <div className={classes.projectDiv}>
        {!mainPage && (
          <Row className="justify-content-start">
            <Col xs="auto">
              <div className={classes.select}>
                <label htmlFor="tech">
                  Choose Tech:
                  <select
                    name="tech"
                    id="tech"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {options.map((option) => (
                      <option value={option.toLowerCase()} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </Col>
          </Row>
        )}
        <Row id={classes.cardRow}>
          {projectData.map((project) => {
            const img = (
              <Image src={project.imageUrl[0]?.url} fluid alt="project image" />
            );
            return (
              <Col
                xs={12}
                md={6}
                lg={4}
                className={classes.projectTile}
                key={project._id}
              >
                <Card className={classes.projectCard}>
                  <div className={classes.projectImg}>
                    <Link href={`/projects/${project.slug}`}>{img}</Link>
                  </div>
                  <span className={classes.title}>
                    <h5>
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h5>
                  </span>
                  <div className={classes.body}>
                    <div className={classes.tech}>
                      <strong>Tech:</strong>
                      {project.stack.map((tech) => (
                        <ProjectBadge key={`${project._id}-${tech}`}>
                          {tech}
                        </ProjectBadge>
                      ))}
                    </div>
                    <div className={classes.description}>
                      <strong>Summary:</strong>
                      {` ${truncateString(project.subtitle)}`}
                    </div>
                  </div>
                  <div className={classes.viewBtn}>
                    <ViewButton link href={`/projects/${project.slug}`}>
                      View Project
                    </ViewButton>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        {mainPage && (
          <div className={classes.viewAllDiv}>
            <LinkWrapper to="/projects/">
              <Button variant="primary" size="lg" id={classes.viewAllbtn}>
                View All
              </Button>
            </LinkWrapper>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ProjectsSection;
