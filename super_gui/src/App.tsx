import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import FrontDoorUI from "./components/FrontDoorUI";
import Activeparkpass from "./components/Activeparkpass";
import DoorManUI from "./components/DoorManUI";
import { Login } from "./pages/login";
import DigitalLease from "./components/DigitalLease";
import { Nav } from "./global/Nav";
import { Complaint } from "./components/complaint/Complaint";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <BrowserRouter>
        <>
          <Header />
          <Nav
            isModal={isModalOpen} 
            setIsModal={setIsModalOpen} 
            handleModalClose={() => setIsModalOpen(false)} 
          />
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
