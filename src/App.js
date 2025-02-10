import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AwardPage from './pages/AwardPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/award/:awardId" element={<AwardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 