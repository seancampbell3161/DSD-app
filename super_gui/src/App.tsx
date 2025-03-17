import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Complaint } from "./components/complaint/Complaint";
import Nav from "./global/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<SmartLockUI />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
