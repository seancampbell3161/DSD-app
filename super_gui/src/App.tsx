import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyleGuide } from './pages/StyleGuide';
import { Complaint } from './components/complaint/Complaint';
import Header from './components/Header';

function App() {
  
  return (
    <>
      <Header />
      <Router>
        <a href="/StyleGuide" className='text-blue underline'>Style Guide</a>
        <Complaint />
        <Routes>
          <Route path="/StyleGuide" element={<StyleGuide />} />
        </Routes>
      </Router>
    </> 
  )
}

export default App;
