const getUrl = url => {
  const location = window.location;
  const protocol = location.protocol;
  const host = location.host;
  const domain = `${protocol}//${host}`;
  const madedDomain = `${domain}/${url}`;
  return madedDomain;
};

export default getUrl;
