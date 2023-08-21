/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  ogImage,
  ogType,
}) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            rootUrl
          }
        }
        file(relativePath: { regex: "/.*face-cover.png/" }) {
          childImageSharp {
            gatsbyImageData(width: 2400, height: 1260)
          }
        }
      }
    `
  );

  const { siteMetadata } = data.site;

  const metaDescription = description || siteMetadata.description;

  const rootUrl = siteMetadata.rootUrl;

  ogImage =
    rootUrl + (ogImage || data.file.childImageSharp?.gatsbyImageData?.images?.fallback?.src);

  const finalTitle = `${title} | ${siteMetadata.title}`;

  const [includeAnalytics, setIncludeAnalytics] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIncludeAnalytics(true);
    }, 500);
  }, []);

  return (
    <>
      <html lang={lang} />
      <title>{finalTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType || `website`} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary" />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(`, `)} />
      )}
      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      <link
        href="https://fonts.googleapis.com/css2?family=Noticia+Text:ital,wght@0,400;0,700;1,400;1,700&family=Quando&display=swap"
        rel="stylesheet preload"
      />
      {includeAnalytics && (
        <>
          <script
            defer
            id="gtag"
            src="https://www.googletagmanager.com/gtag/js?id=UA-90813960-7"
          ></script>
          <script id="gtag2" defer>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-90813960-7');`}
          </script>
        </>
      )}
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
};

export default SEO;
