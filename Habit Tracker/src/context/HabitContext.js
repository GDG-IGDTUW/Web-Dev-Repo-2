// src/context/HabitContext.js
import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState(() =>{
        try{
            const existingHabits = localStorage.getItem('habits');
            return existingHabits ? JSON.parse(existingHabits) : [];

        }catch(error){
            console.error(error);
            return [];
        }
    });

    const setLocalStorage = (key, value) => {
        try{
            localStorage.setItem(key, JSON.stringify(value));
        }catch(error){
            console.error("Could not save to localstorage", error);
        }
    }

    const addHabit = (name) => {
        const newHabit = { id: Date.now(), name, completed: false };
        setHabits(prev => {
            const updatedHabits = [...prev, newHabit];
            setLocalStorage('habits', updatedHabits);
            return updatedHabits;
        });
    };

    const toggleComplete = (id) => {
        let habitBeingToggled = false;
        setHabits(prev => {
            const updatedHabits = prev.map((habit) => {
                if (habit.id === id) {
                    if (!habit.completed) {
                        habitBeingToggled = true;
                    }
                    return { ...habit, completed: !habit.completed };
                }
                return habit;
            });
            setLocalStorage('habits', updatedHabits);
            return updatedHabits;
        });
    
        if (habitBeingToggled) {
            fetchQuote();
        }
    };
    
    const fetchQuote = async () => {
        try {
            const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "GZSeh7X2i4cdfiX0IWDhjQ==L8g0WBZKLgxTgzCM"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            toast.success(data[0].quote);
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    };

    const deleteHabit = (id) => {
        setHabits(prev => {
            const updatedHabits = prev.filter((habit) => habit.id !== id);
            setLocalStorage('habits', updatedHabits);
            return updatedHabits;
        });
    };

    const clearCompletedHabits = () =>{
        setHabits(prev => {
            const updatedHabits = prev.filter((habit) => !habit.completed);
            setLocalStorage('habits', updatedHabits);
            return updatedHabits;
        });
    }

    return (
        <HabitContext.Provider value={{ habits, addHabit, toggleComplete, deleteHabit, clearCompletedHabits }}>
            {children}
        </HabitContext.Provider>
    );
};
