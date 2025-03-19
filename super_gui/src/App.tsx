import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import Activeparkpass from "./components/Activeparkpass";
import { Login } from "./pages/login";
import { Complaint } from "./components/complaint/Complaint";
import DigitalLease from "./components/DigitalLease";
import { Nav } from "./global/Nav.tsx";

import { useState } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin && 
        <Login 
          setShowLogin={setShowLogin} 
        />
      }
      <BrowserRouter>
        <>
          <Header />
          <Nav />
        </>
        <Routes>
          <Route path="/" element={<SmartLockUI />} />
          <Route path="/parking" element={<Activeparkpass />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/lease" element={<DigitalLease />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
