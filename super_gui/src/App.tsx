import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Login } from "./pages/login";
import { Complaint } from "./components/complaint/Complaint";
import Nav from "./global/Nav";

const App = () => {
  const [isModal, setIsModal] = useState(false);

  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <>
      <Login />
      <BrowserRouter>
        <Header />
        <Nav 
          isModal={isModal}
          setIsModal={setIsModal}
          handleModalClose={handleModalClose}
        />
        <Routes>
          <Route path="/" element={<SmartLockUI />} />
          <Route path="/complaint" element={<Complaint />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
