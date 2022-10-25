import { Helmet } from 'react-helmet-async';
import Router from 'components/Router';

const App = () => {
  return (
    <>
      <Helmet>
        <title>sajin</title>
        <meta
          name="description"
          content="Easily share or save your photos with friends with Sajin."
        />
        <meta property="og:image" content="https://images.velog.io/velog.png" />
      </Helmet>
      <Router />
    </>
  );
};

export default App;
