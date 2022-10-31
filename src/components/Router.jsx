import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from 'routes/Home';
import NotFoundPage from 'routes/NotFoundPage';
import ServiceUnavailable from 'routes/ServiceUnavailable';
import Viewer from 'routes/Viewer';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />}></Route>
        <Route path="503" element={<ServiceUnavailable />}></Route>
        <Route path="i" element={<Viewer />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default Router;
