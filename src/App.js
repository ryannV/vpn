import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchArq from './pages/SearchArq';
import SendEmail from './pages/SendEmail';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchArq/>} />
        <Route path="/Email" element={<SendEmail/>} />
      </Routes>
    </Router>
  );
};

export default App;