import React from 'react';
import '../styling/Navbar.css';
import {  useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            
            <div className="title">Habit Tracker</div>
            <div className="button-container">
                <button className="button"
                onClick={()=>navigate("/")}
                >Home</button>
                <button className="button" 
                onClick={()=>navigate("/all-habits")}
                >Habits</button>
          
            </div>
        </div>
    );
};

export default Navbar;
