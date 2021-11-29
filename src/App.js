import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
import LikePage from './components/LikePage/LikePage'



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar /><br />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route path='/likes' element={ <LikePage />} />  
    </Routes>
    <Footer />
    </div>
    </BrowserRouter>
  

  );
}

export default App;
