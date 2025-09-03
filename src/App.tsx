import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Test from "./pages/test/Test";
import Subscribe from "./pages/Subscribe";
import Forms from "./pages/Forms";
import "@/styles/globals.scss";
import "@/styles/home.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/forms" element={<Test />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<Forms />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}
