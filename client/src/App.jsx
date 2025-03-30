import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import AppRoutes from './routes/Routes';
import './assets/css/Site.css';

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
