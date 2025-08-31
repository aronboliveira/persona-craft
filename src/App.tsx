import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Test from "./pages/test/Test";
import Subscribe from "./pages/Subscribe";
import Forms from "./pages/Forms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<Forms />} />
        <Route path="/test" element={<Test />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}
