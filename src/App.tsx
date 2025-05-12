import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import RouteProtection from "./Components/RouteProtection/RouteProtection";
import ViewAllProducts from "./Components/ViewAllProducts/ViewAllProducts";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import ViewProduct from "./Components/ViewProduct/ViewProduct";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RouteProtection />}>
            <Route path="/" element={<ViewAllProducts />}></Route>
            <Route path="/product/:productId" element={<ViewProduct />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
