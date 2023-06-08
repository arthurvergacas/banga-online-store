import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import Home from 'pages/Home';
import Error from 'pages/Error';
import ProductDetails from 'pages/ProductDetails';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Cart from 'pages/Cart';
import Payment from 'pages/Payment';
import Checkout from 'pages/Checkout';
import UserBackoffice from 'pages/UserBackoffice';
import { useState } from 'react';
import UserService from 'services/userService';
import GuardedRoute from './GuardedRoute';
import EditUserBackoffice from 'pages/EditUserBackoffice';
import ProductBackoffice from 'pages/ProductBackoffice';
import ProductManagementBackoffice from 'pages/ProductManagementBackoffice';

export default function Router() {
  const [userLoggedIn, setUserLoggedIn] = useState(UserService.isUserLoggedIn());

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login onSuccessfulLogin={() => setUserLoggedIn(true)} />} />
        <Route path="sign-up" element={<SignUp onSuccessfulSignUp={() => setUserLoggedIn(true)} />} />

        <Route element={<GuardedRoute isRouteAccessible={userLoggedIn} redirectRoute="/login" />}>
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="checkout" element={<Checkout />} />

          <Route path="profile" element={<Profile />} />

          <Route path="admin">
            <Route path="products" element={<ProductBackoffice />} />
            <Route path="products/:productId" element={<ProductManagementBackoffice />} />

            <Route path="users" element={<UserBackoffice />} />
            <Route path="users/:userId" element={<EditUserBackoffice />} />
          </Route>
        </Route>

        <Route path="product/:productId" element={<ProductDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
