import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchArq from './pages/SearchArq';
import SendEmail from './pages/SendEmail';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark_mode');
      document.body.classList.remove('light_mode');
    } else {
      document.body.classList.add('light_mode');
      document.body.classList.remove('dark_mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchArq darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/Email" element={<SendEmail darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </Router>
  );
};

export default App;