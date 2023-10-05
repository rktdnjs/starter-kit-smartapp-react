import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageCapturePage from "./pages/ImageCapturePage";
import Nav from "./components/Nav";
import "./styles/App.css";

function App() {
  // imageCapture를 통해 캡쳐된 이미지 링크들에 대한 정보를 저장해놓는 변수

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
