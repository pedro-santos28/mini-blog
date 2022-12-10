import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
    </>
  );
};

export default Rotas;
