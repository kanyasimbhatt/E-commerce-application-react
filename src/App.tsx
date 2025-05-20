import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { RouteProtectionWrapper } from './Components/RouteProtection/RouteProtection';
import ProductList from './Components/Products/ProductList/ProductList';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { getData } from '../Utils/Store';

function App() {
  const userId = getData('user-id');
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  return (
    <Routes>
      <Route element={<RouteProtectionWrapper userId={userId} />}>
        <Route path="/" element={<ProductList />}></Route>
      </Route>
      <Route
        path="/login"
        element={userId ? <Navigate to={from} /> : <Login />}
      ></Route>
      <Route
        path="/signup"
        element={userId ? <Navigate to={from} /> : <SignUp />}
      ></Route>
    </Routes>
  );
}

export default App;
