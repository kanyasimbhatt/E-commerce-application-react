import { Route, Routes } from 'react-router-dom';
import RouteProtection from './Components/RouteProtection/RouteProtection';
import ProductList from './Components/Products/ProductList/ProductList';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<RouteProtection />}>
        <Route path="/" element={<ProductList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
