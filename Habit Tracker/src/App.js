// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import Home from './components/Home';
import HabitListPage from './components/HabitListPage';
import Navbar from './components/Navbar';


const App = () => {
        return (
        <Router>
        <Navbar/>
            
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/all-habits" element={<HabitListPage />} />
            </Routes>
        </Router>
    );
};

const WrappedApp = () => (
    <HabitProvider>
        <App />
    </HabitProvider>
);

export default WrappedApp;