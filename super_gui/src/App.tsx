import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import DigitalLease from "./components/DigitalLease";
import { Login } from "./pages/login";

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
    <>
      <Login />
      <BrowserRouter>
        <Header />
        <nav className="flex justify-center gap-8">
          {/* Navigation component */}
          <Link to="/styleguide">Style Guide</Link>
          <Link to="/smartlockui">Smart Lock UI</Link>
          <Link to="/complaint">Complaint</Link>
        </nav>
        <Routes>
          <Route path="/styleguide" element={<StyleGuide />} />
          <Route path="/smartlockui" element={<SmartLockUI />} />
          <Route path="/complaint" element={<Complaint />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
