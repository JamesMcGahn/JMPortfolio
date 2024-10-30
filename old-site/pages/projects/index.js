import React from 'react';
import PageHead from '../../components/layout/PageHead';
import ProjectsSection from '../../components/sections/ProjectsSection';
import dbConnect from '../../utils/dbConnect';
import Project from '../../models/Project';

function Projects({ projects }) {
  return (
    <div>
      <PageHead title="James McGahn | Projects" />
      <ProjectsSection projects={projects} mainPage={false} />
    </div>
  );
}

export default Projects;

export async function getStaticProps() {
  await dbConnect();
  const projects = await Project.find({}).lean();

  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) },
    revalidate: 3600,
  };
}
