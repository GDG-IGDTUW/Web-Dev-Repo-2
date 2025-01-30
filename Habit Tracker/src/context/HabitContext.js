// src/context/HabitContext.js
import React, { createContext, useState, useEffect } from 'react';
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
    const [sortBy, setSortBy] = useState('default');

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
            const updatedHabits = [newHabit, ...prev];
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

    useEffect(() => {
        setHabits((prev) => {
            const sortedHabits = [...prev].sort((a, b) => {
                if (sortBy === 'alphabetical') {
                    return a.name.localeCompare(b.name); 
                } else if (sortBy === 'completion') {
                    return a.completed === b.completed ? 0 : a.completed ? 1 : -1; 
                } else if (sortBy === 'createdAt') {
                    return b.id - a.id; 
                }
                return 0; 
            });
            setLocalStorage('habits', sortedHabits);
            return sortedHabits;
        })
    }, [sortBy]);
    
    return (
        <HabitContext.Provider value={{ habits, addHabit, toggleComplete, deleteHabit, clearCompletedHabits, setSortBy }}>
            {children}
        </HabitContext.Provider>
    );
};
