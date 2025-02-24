import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { StyleGuide } from "./pages/StyleGuide";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />

            <Router>
                <a href="/StyleGuide" className="text-blue underline">
                    Style Guide
                </a>

                <Routes>
                    <Route path="/StyleGuide" element={<StyleGuide />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
