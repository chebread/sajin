const getThisUrl = () => {
  const location = window.location;
  const thisUrl = location.href;
  return thisUrl;
};

export default getThisUrl;
