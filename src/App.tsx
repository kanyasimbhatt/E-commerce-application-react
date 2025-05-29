import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteProtection } from './Components/RouteProtection/RouteProtection';
import { ViewAllProductsWrapper } from './Components/ViewAllProducts/ViewAllProducts';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { ViewProduct } from './Components/ViewProduct/ViewProduct';
import ViewFavorites from './Components/ViewFavorite/ViewFavorites';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RouteProtection />}>
            <Route path="/" element={<ViewAllProductsWrapper />}></Route>
            <Route path="/product/:productId" element={<ViewProduct />}></Route>
            <Route path="/favorites" element={<ViewFavorites />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
