import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PowerWord from './PowerWord'; // Import the PowerWord component

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Buzzle.life!</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/power-word">
          <button style={{ fontSize: '20px', padding: '10px 20px' }}>Power Word</button>
        </Link>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button style={{ fontSize: '20px', padding: '10px 20px' }} disabled>Future Game 1</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button style={{ fontSize: '20px', padding: '10px 20px' }} disabled>Future Game 2</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/power-word" element={<PowerWord />} />
      </Routes>
    </Router>
  );
}

export default App;
