import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index />

        <Route path="/cart" />
        <Route path="/profile" />

        <Route path="/product/:productId" />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
