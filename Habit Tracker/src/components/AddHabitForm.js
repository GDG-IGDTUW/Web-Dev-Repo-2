// src/components/AddHabitForm.js
import React, { useState, useEffect, useRef } from 'react';

const AddHabitForm = ({ addHabit }) => {
    const [habitName, setHabitName] = useState('');
    const inputRef = useRef(null);
    useEffect(() =>{
        const handleKeyPress = (e) => {
            if(inputRef.current){
                inputRef.current.focus();
            }
        }
        window.addEventListener('keydown', handleKeyPress);

        return () =>{
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (habitName.trim()) {
            addHabit(habitName.trim());
            setHabitName('');
        }
    };

    return (
        <form className="add-habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a new habit"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                maxLength={50}
                ref={inputRef}
            />
            <button type="submit" disabled={!habitName.trim()}>
                Add Habit
            </button>
        </form>
    );
};

export default AddHabitForm;
