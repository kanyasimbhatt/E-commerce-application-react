import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const RouteProtection = lazy(
  () => import('./Components/RouteProtection/RouteProtection')
);

const ProductList = lazy(
  () => import('./Components/Products/ProductList/ProductList')
);

const Login = lazy(() => import('./Components/Auth/Login/Login'));
const SignUp = lazy(() => import('./Components/Auth/SignUp/SignUp'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const ViewProduct = lazy(
  () => import('./Components/Products/ProductInfo/ViewProduct')
);
const ViewFavorites = lazy(
  () => import('./Components/Products/ViewFavorite/ViewFavorites')
);

function App() {
  return (
    <Routes>
      <Route
        element={
          <Suspense>
            <RouteProtection />
          </Suspense>
        }
      >
        <Route
          path="/"
          element={
            <Suspense>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Suspense>
              <ViewProduct />
            </Suspense>
          }
        />
        <Route
          path="/favorites"
          element={
            <Suspense>
              <ViewFavorites />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
