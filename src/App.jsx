import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios";
import './App.css';
import { useEffect } from 'react';
import Home from "../sections/Home"
import Character from "../sections/Character.jsx"

const API_KEY =  import.meta.env.VITE_APP_ACCESS_KEY;


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/character/:id" element = {<Character />} />
      </Routes>
    </BrowserRouter>
  )

 
  
}

export default App
