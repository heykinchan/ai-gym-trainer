import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Welcome from './Welcome';
import TraineePage from './TraineePage';
import TrainerPage from './TrainerPage';
import GymOwnerPage from './GymOwnerPage';
import TechTeamPage from './TechTeamPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/trainee" element={<TraineePage />} />
        <Route path="/trainer" element={<TrainerPage />} />
        <Route path="/gymowner" element={<GymOwnerPage />} />
        <Route path="/techteam" element={<TechTeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;