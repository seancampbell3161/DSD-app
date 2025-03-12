import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import Activeparkpass from "./components/Activeparkpass";
import Complaint from "./components/complaint/Complaint";
import Lease from "./components/Lease";
import SmartLock from "./components/SmartLock";
import Nav from "./global/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<SmartLockUI />} />
        <Route path="/parking" element={<Activeparkpass />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/lease" element={<Lease />} />
        <Route path="/smartlock" element={<SmartLock />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
