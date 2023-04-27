import "./App.css";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="productdetail/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
