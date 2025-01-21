// src/App.js
import React, { useState, useContext } from 'react';
import Header from './components/Header';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import { HabitContext, HabitProvider } from './context/HabitContext';
import { Toaster } from 'react-hot-toast';
import './style.css';

const App = () => {
    const { habits, addHabit, toggleComplete, deleteHabit, clearCompletedHabits } = useContext(HabitContext);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        <div className={isDarkMode ? 'app dark-mode' : 'app'}>
            <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} clearCompletedHabits={clearCompletedHabits} />
            <AddHabitForm addHabit={addHabit} />
            <HabitList
                habits={habits}
                toggleComplete={toggleComplete}
                deleteHabit={deleteHabit}
            />
            <Toaster 
                position='top-center'
                toastOptions={{
                    duration: 5000,
                    style: {
                        width: '500px',
                    }
                }}
            />
        </div>
    );
};

const WrappedApp = () => (
    <HabitProvider>
        <App />
    </HabitProvider>
);

export default WrappedApp;