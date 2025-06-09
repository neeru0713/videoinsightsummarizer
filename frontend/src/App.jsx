import React from 'react'
import './App.css'
import SignUp from '../components/SingUp'
import SignIn from "../components/SignIn";
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
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
