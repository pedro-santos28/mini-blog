import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Rotas from './Rotas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <Rotas></Rotas>
          <ToastContainer />
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
