import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Blog from "../components/home/Blog"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <Blog />
    </div>
  </Layout>
)

export default IndexPage
