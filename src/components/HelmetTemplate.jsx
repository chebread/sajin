import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import getThisUrl from './getThisUrl';

const HelmetTemplate = ({ title, desc }) => {
  // (1): thumnail 추가하기
  const thisUrl = useRef(getThisUrl());
  const seoContent = useRef({
    url: thisUrl.current,
    title: title,
    desc: desc,
  });

  return (
    <Helmet>
      <title>{seoContent.current.title}</title>
      <meta name="description" content={seoContent.current.desc} />
      <link rel="canonical" href={seoContent.current.url} />
      <meta property="og:url" content={seoContent.current.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seoContent.current.title} />
      <meta property="og:description" content={seoContent.current.desc} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoContent.current.title} />
      <meta name="twitter:description" content={seoContent.current.desc} />
    </Helmet>
  );
};

export default HelmetTemplate;
