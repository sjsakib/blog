import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Blog from '../components/Blog';

const BlogPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Blog />
    </div>
  </Layout>
);

export default BlogPage;
