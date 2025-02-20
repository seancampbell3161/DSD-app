import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { StyleGuide } from './pages/StyleGuide';

function App() {
  
  return (
    <>
      <h1 className='text-red header'>Super App</h1>
      <Router>
        <a href="/StyleGuide" className='text-blue underline'>Style Guide</a>

        <Routes>
          <Route path="/StyleGuide" element={<StyleGuide />} />
        </Routes>

      </Router>
    </> 
  )
}

export default App
