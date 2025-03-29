import "./App.css";
import "./ComponentsStyle.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { login, store } from "./store"; //Global States
import { useEffect } from "react";

//Components
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { NavbarUser } from "./pages/user/NavbarUser";
import { Profile } from "./pages/user/Profile";
import { About } from "./pages/user/About";
import { Product } from "./pages/user/Product";
import { Cart } from "./pages/user/Cart";
import { NavbarAdmin } from "./pages/admin/NavbarAdmin";
import { Dashboard } from "./pages/admin/Dashboard";
import { Orders } from "./pages/admin/Orders";
import { Products } from "./pages/admin/Products";
import { Users } from "./pages/admin/Users";
import { Settings } from "./pages/admin/Settings";
import { OrderProduct } from "./pages/user/OrderProduct";
import { ProductEdit } from "./pages/admin/ProductEdit";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      dispatch(login(user));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/user" element={<NavbarUser />}>
            <Route path="product" element={<Product />} />
            <Route path="product/:details" element={<OrderProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/about" element={<About />} />

          <Route path="/admin" element={<NavbarAdmin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="products/edit/:details" element={<ProductEdit />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

const NoPage = () => {
  return (
    <div className="text-center font-extrabold text-6xl font-mono">
      Page not Found 404
    </div>
  );
};

export default App;
