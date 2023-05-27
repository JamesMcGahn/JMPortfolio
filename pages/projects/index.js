import React, { useState } from 'react';
import { useRouter } from 'next/router'
import PageHead from '../../components/layout/PageHead';
import ProjectsSection from '../../components/sections/ProjectsSection'

function Projects({ projects }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useRouter()

    return (
        <div>
            <PageHead title="James McGahn | Projects" />
            <ProjectsSection projects={projects} mainPage={false} />
        </div >
    );
}

export default Projects;

import dbConnect from '../../utils/dbConnect'
import Project from "../../models/Project"

export async function getStaticProps(context) {
    await dbConnect()
    const projects = await Project.find({}).lean()

    return { props: { projects: JSON.parse(JSON.stringify(projects)) }, revalidate: 3600 }
}