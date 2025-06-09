import React from 'react'
import './App.css'
import SignUp from '../components/SingUp'
import Home from "../components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {


  return (
    <>
    
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
           
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
