//imports
import React,{useState} from "react";
import Products from "./Pages/Products";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailPage from "./Pages/DetailPage";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Orders from "./Pages/Orders";
import Referals from "./Pages/Referals";

// App Component Which routes 

/*
    /       - Home Products page
    /login  - Login Page 
    /product/:id  - DetailsPage    id as paramater
    /cart      - Cart Page
*/  

function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
        <Route path = "/register" element ={ <Register />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<DetailPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<Orders cart={cart} setCart={setCart} />} />
        <Route path="/referals" element={<Referals cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
