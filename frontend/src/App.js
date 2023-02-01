import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Rotas from './Rotas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  if (!process.env.REACT_APP_API) {
    throw new Error('Env API variable not found');
  }
  if (!process.env.REACT_APP_URL) {
    throw new Error('Env URL variable not found');
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Rotas />
          <ToastContainer />
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
