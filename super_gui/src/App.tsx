import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Activeparkpass from "./components/Activeparkpass";
import Nav from "./global/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/parking" element={<Activeparkpass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
