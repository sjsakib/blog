import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <section className="not-found">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </section>
  </Layout>
);

export default NotFoundPage;
