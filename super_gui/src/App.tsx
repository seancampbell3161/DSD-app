import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import FrontDoorUI from "./components/FrontDoorUI.tsx";
import Activeparkpass from "./components/Activeparkpass";
import DoorManUI from "./components/DoorManUI.tsx";
import { Login } from "./pages/login";
import { Complaint } from "./components/complaint/Complaint";
import DigitalLease from "./components/DigitalLease";
import { Nav } from "./global/Nav.tsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <BrowserRouter>
        <>
          <Header />
          <Nav />
        </>
        <Routes>
          <Route path="/" element={<FrontDoorUI />} />
          <Route path="/parking" element={<Activeparkpass />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/lease" element={<DigitalLease />} />
          <Route path="/doormanui" element={<DoorManUI />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
