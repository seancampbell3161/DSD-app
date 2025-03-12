import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import Nav from "./global/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<SmartLockUI />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
