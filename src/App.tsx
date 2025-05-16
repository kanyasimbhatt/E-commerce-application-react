import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigate } from 'react-router-dom';
import { RouteProtectionWrapper } from './Components/RouteProtection/RouteProtection';
import { ViewAllProducts } from './Components/Products/ViewAllProducts/ViewAllProducts';
import { Login } from './Components/Auth/Login/Login';
import { SignUp } from './Components/Auth/SignUp/SignUp';
import { getData } from './Components/Utils/Store';

function App() {
  const userId = getData('user-id');
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RouteProtectionWrapper userId={userId} />}>
            <Route path="/" element={<ViewAllProducts />}></Route>
          </Route>
          <Route
            path="/login"
            element={userId ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/signup"
            element={userId ? <Navigate to="/" /> : <SignUp />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
