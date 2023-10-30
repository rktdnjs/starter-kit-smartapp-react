import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ImageCapturePage from "./pages/ImageCapturePage";
import Nav from "./components/Nav";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ImageCapturePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
