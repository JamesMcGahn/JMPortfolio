import React from 'react';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import BreakSection from '../components/sections/BreakSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/client';
import classes from '../styles/index.module.css';
import LinkWrapper from '../components/utils/LinkWrapper';
import PageHead from '../components/layout/PageHead';

export default function Home({ projects }) {
  const [session, loading] = useSession();
  return (
    <div>
      <PageHead title="James McGahn | Home" />
      <Hero h1="" h2="" />

      <AboutSection />
      <BreakSection url="/img/breaker6.jpg">
        <div className={classes.iconSection}>
          <div className={classes.icon}>
            <a href="https://github.com/JamesMcGahn" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div className={classes.icon}>
            <a href="https://www.linkedin.com/in/james-mcgahn-579067156/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <div className={classes.icon}>
            <LinkWrapper to="/contact">
              <FontAwesomeIcon icon={faEnvelope} />
            </LinkWrapper>
          </div>
        </div>
      </BreakSection>
      <ProjectsSection projects={projects} mainPage={true} />
    </div>
  );
}

import dbConnect from '../utils/dbConnect';
import Project from '../models/Project';

export async function getStaticProps(context) {
  await dbConnect();
  const projects = await Project.find({ mainPage: true }).lean();
  return { props: { projects: JSON.parse(JSON.stringify(projects)) }, revalidate: 3600 };
}
