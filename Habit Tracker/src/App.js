// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";
import Home from "./components/Home";
import HabitListPage from "./components/HabitListPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar"
const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            width: "500px",
          },
        }}
      />
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-habits" element={<HabitListPage />} />
        </Routes>
      </Router>
    </>
  );

};

const WrappedApp = () => (
  <HabitProvider>
    <App />
  </HabitProvider>
);

export default WrappedApp;
