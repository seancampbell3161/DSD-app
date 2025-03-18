import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Login } from "./pages/login";
import { Complaint } from "./components/complaint/Complaint";

    const App = () => {
      return (
        <>
          <Login />
          <BrowserRouter>
            <Header />
            <nav className="flex justify-center gap-8">
              {/* Navigation component */}
              <Link to="/smartlockui">Smart Lock UI</Link>
              <Link to="/complaint">Complaint</Link>
              <Link to="/login">Login</Link>
            </nav>
            <Routes>
              <Route path="/smartlockui" element={<SmartLockUI />} />
              <Route path="/complaint" element={<Complaint />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </>
    );
    };

export default App;
