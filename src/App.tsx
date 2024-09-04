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
import APage from './APage';
import BPage from './BPage';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/a" element={<APage />} />
        <Route path="/b" element={<BPage />} />
        <Route path="/search" element={<FilterProductPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route element={<ProtectedRoutePage />}>
          <Route path="cart" element={<CartPage />} />
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
  return <RouterProvider router={router} />;
}

export default App;
