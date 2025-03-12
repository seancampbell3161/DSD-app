import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import { Complaint } from "./components/complaint/Complaint";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import DigitalLease from "./components/DigitalLease";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/smartlockui" element={<SmartLockUI />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/lease" element={<DigitalLease />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
