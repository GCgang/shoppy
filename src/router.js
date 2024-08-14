import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Carts from './pages/Carts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products/new', element: <NewProduct /> },
      { path: '/products/:id', element: <ProductDetail /> },
      { path: '/carts', element: <Carts /> },
    ],
  },
]);

export default router;
