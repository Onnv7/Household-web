import LoginPage from './page/login/LoginPage';
import HomePage from './page/home/HomePage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import RootLayout from './page/layout/RootLayout';
import ProductPage from './page/product/ProductPage';
import CartPage from './page/cart/CartPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import FilterProductPage from './page/filter-product/FilterProductPage';
import ProtectedRoutePage from './page/protected-route/ProtectedRoutePage';
import RegisterPage from './page/register/RegisterPage';
import AccountPage from './page/profile/AccountPage';
import OrderPage from './page/order/OrderPage';
import { useInterceptor } from './config/http/http';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<FilterProductPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route element={<ProtectedRoutePage />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>
      </Route>
    </Route>,
    // <Route path="/product/:id" element={<ProductPage />}>
    //   {/* <Route index element={<ProductPage />} /> */}
    // </Route>,

    <Route path="login" element={<LoginPage />} />,
    <Route path="register" element={<RegisterPage />} />,
  ]),
);
function App() {
  useInterceptor();
  return <RouterProvider router={router} />;
}

export default App;
