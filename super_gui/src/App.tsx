import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import { Complaint } from "./components/complaint/Complaint";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";

const App = () => {
  return (
    <BrowserRouter>
      <nav className=" flex justify-center gap-8">
        {/* Navigation component */}
        <Link to="/">Home</Link>
        <Link to="/styleguide">Style Guide</Link>
        <Link to="/smartlockui">Smart Lock UI</Link>
        <Link to="/complaint">Complaint</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/smartlockui" element={<SmartLockUI />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
