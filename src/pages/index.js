import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Blog from "../components/home/Blog"
import Hero from "../components/home/Hero"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Hero />
      <div className="divider no-margin" />
      <Blog />
    </div>
  </Layout>
)

export default IndexPage
