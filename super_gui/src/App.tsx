import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import { Complaint } from "./components/complaint/Complaint";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Login } from "./pages/login";

const App = () => {
  return (
    <>
      <Login />
      <BrowserRouter>
        <Header />
        <nav className="flex justify-center gap-8">
          {/* Navigation component */}
          <Link to="/styleguide">Style Guide</Link>
          <Link to="/smartlockui">Smart Lock UI</Link>
          <Link to="/complaint">Complaint</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/styleguide" element={<StyleGuide />} />
          <Route path="/smartlockui" element={<SmartLockUI />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
