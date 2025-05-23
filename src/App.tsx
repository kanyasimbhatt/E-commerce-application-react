import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import RouteProtection from './Components/RouteProtection/RouteProtection';
import ProductList from './Components/Products/ProductList/ProductList';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import NotFound from './Components/NotFound/NotFound';
import { useUsers } from './Components/Auth/userProvider';

function App() {
  const { userId } = useUsers();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  return (
    <Routes>
      <Route element={<RouteProtection userId={userId} />}>
        <Route path="/" element={<ProductList />} />
      </Route>
      <Route
        path="/login"
        element={userId ? <Navigate to={from} /> : <Login />}
      />
      <Route
        path="/signup"
        element={userId ? <Navigate to={from} /> : <SignUp />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
