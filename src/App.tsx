import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { RouteProtection } from './Components/RouteProtection/RouteProtection';
import { ViewAllProducts } from './Components/ViewAllProducts/ViewAllProducts';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RouteProtection />}>
            <Route path="/" element={<ViewAllProducts />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
