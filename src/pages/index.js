import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Blog from '../components/Blog';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectsShortlist from '../components/ProjectsShortlist';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <Hero />
      <div className="divider no-margin" />
      <About />
      <div className="divider not-margin" />
      <Skills />
      <div className="divider no-margin" />
      <ProjectsShortlist />
      <div className="divider no-margin" />
      <Blog />
    </div>
  </Layout>
);

export default IndexPage;
