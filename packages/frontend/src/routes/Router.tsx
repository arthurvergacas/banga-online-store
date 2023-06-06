import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import Home from 'pages/Home';
import Error from 'pages/Error';
import ProductDetails from 'pages/ProductDetails';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route path="/cart" />
        <Route path="/profile" />

        <Route path="/product/:productId" element={<ProductDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
