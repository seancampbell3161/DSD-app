import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import { Complaint } from "./components/complaint/Complaint";
import Header from "./components/Header";
import SmartLockUI from "./components/SmartLockUI";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/smartlockui" element={<SmartLockUI />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
