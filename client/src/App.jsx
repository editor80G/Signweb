import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Layout from './components/Layout';
import AppRoutes from './routes/Routes';

// import './App.css';
import './assets/css/Site.css'; // Import the CSS file

const App = () => {
  return (
    <Providers>
      <Router>
        <AppRoutes />
      </Router>
    </Providers>
  );
};

export default App;
