import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Home from "./pages/Home";
import Navbar from "./components/navs/Navbar";
import About from "./pages/About";
import Test from "./components/test/Test";

export default function App() {
  return (
    <BrowserRouter>
      <div className={App.name}></div>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<About />} caseSensitive />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
