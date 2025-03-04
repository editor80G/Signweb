import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Registration';
import Layout from './components/Layout';
import Publications from './components/Publications';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/publications" element={<Publications />} />
            {/* Add other routes here */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
