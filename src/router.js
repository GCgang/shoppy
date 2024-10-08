import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AllProducts from './pages/AllProducts';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Carts from './pages/Carts';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import CategoryProducts from './pages/CategoryProducts';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/products', element: <AllProducts /> },
      {
        path: '/products/:category',
        element: <CategoryProducts />,
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requiredAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/search',
        element: <Search />,
      },
      { path: '/product/:id', element: <ProductDetail /> },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <Carts />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
