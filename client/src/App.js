import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage/landingPage';
import Home from './Components/Home/home';
import DogDetail from './Components/DogDetail/dogDetail.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dogs" element={<Home/>} />
        <Route path="/dogDetail/:id" element={<DogDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;