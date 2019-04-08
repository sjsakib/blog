import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Blog from '../components/Blog';

const BlogPage = () => (
  <Layout>
    <SEO title="Blog" />
    <div className="page">
      <Blog perPage={1000} perRow={2} />
    </div>
  </Layout>
);

export default BlogPage;
