import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Blog from '../components/Blog';

const BlogPage = () => (
  <Layout>
    <Seo title="Blog" />
    <div className="page">
      <Blog perPage={1000} perRow={1} showTags={10}/>
    </div>
  </Layout>
);

export default BlogPage;
