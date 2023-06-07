import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import Home from 'pages/Home';
import Error from 'pages/Error';
import ProductDetails from 'pages/ProductDetails';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Cart from 'pages/Cart';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/product/:productId" element={<ProductDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
