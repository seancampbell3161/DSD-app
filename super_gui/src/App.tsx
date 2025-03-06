import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import { Complaint } from "./components/complaint/Complaint";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";
import { Nav } from "./global/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/smartlockui" element={<SmartLockUI />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
