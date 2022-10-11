import Router from 'components/Router';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
// import Notify from 'components/Notify';
const App = () => {
  return (
    <RecoilRoot>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <Router />
    </RecoilRoot>
  );
};

export default App;
