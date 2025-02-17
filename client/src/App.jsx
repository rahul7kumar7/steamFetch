import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Product from "./Pages/Product.jsx"
import Header from "./Pages/Components/Header.jsx";

export default function App() {
return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<Product />} />
        </Routes>
    </BrowserRouter>
)
}