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
  Link
} from "react-router-dom";
import parse from 'html-react-parser'
import Login from './components/Login/Login'
import SingUp from './components/SingUp/SingUp'
import Home from './components/Home/Home'



function App() {
  return (
    <BrowserRouter>
      <Navbar /><br />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<SingUp />} />
        <Route path="/" element={<Home />} />  
    </Routes>
               

    </BrowserRouter>
  

  );
}

export default App;
