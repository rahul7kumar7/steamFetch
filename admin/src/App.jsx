import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Header from "./Pages/Components/Header.jsx";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import SubmitGame from "./Pages/SubmitGame.jsx";
import Footer from "./Pages/Components/Footer.jsx"

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/submit" element={<SubmitGame />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}