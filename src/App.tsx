import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { RouteProtection } from './Components/RouteProtection/RouteProtection';
import { ViewAllProductsWrapper } from './Components/ViewAllProducts/ViewAllProducts';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { ViewProduct } from './Components/ViewProduct/ViewProduct';
import ViewFavorites from './Components/ViewFavorite/ViewFavorites';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RouteProtection />}>
            <Route path="/" element={<ViewAllProductsWrapper />}></Route>
            <Route path="/product/:productId" element={<ViewProduct />}></Route>
            <Route path="/favorites" element={<ViewFavorites />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
