import React from 'react';
import axios from 'axios'

function SiteMap(props) {

    return (
        <div>

        </div>
    );
}

export default SiteMap;

const createSitemap = (projects) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${projects
        .map(({ _id }) => {
            return `
                <url>
                    <loc>${`https://www.jamesmcgahn.com/projects/${_id}`}</loc>
                </url>
            `;
        })
        .join('')}
    </urlset>
    `;

export async function getServerSideProps({ res }) {
    const response = await axios.get(`${process.env.SERVER}/api/projects/`)
    const { data } = await response.data
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(data));
    res.end();
    return { props: {} }
}


