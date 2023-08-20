import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Blog from '../components/Blog';

const BlogPage = () => (
  <Layout>
    <div className="page">
      <Blog perPage={1000} perRow={1} showTags={10}/>
    </div>
  </Layout>
);

export function Head() {
  return <Seo title="Blog" />;
}

export default BlogPage;
