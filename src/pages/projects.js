import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Projects from '../components/Projects';

const ProjectsPage = () => (
  <Layout>
    <Seo title="Projects"/>
    <div className="page">
      <Projects perPage={1000} perRow={2} />
    </div>
  </Layout>
);

export default ProjectsPage;
