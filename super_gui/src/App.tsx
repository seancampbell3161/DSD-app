import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Login } from "./pages/login";
import { Complaint } from "./components/complaint/Complaint";
import DigitalLease from "./components/DigitalLease";
import { Nav } from "./global/Nav.tsx";

const App = () => {
  return (
    <>
      <Login />
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/smartlockui" element={<SmartLockUI />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lease" element={<DigitalLease />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
