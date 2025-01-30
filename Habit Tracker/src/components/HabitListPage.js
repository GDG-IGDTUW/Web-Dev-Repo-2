import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import HabitList from './HabitList';
import '../styling/HabitListPage.css'; // Import the CSS file

const HabitListPage = () => {
   
    const { habits, toggleComplete, deleteHabit, setSortBy } = useContext(HabitContext);

    return (
        <div className="habit-page">
            
            <h1 style={{display:"flex",justifyContent:"center",color:"#4a90e2",fontSize: "50px"}}>All Habits</h1>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', gap: '15px' }}>
                <label htmlFor="sort" style={{ marginRight: '10px', fontSize: '20px' }}>Sort by:</label>
                <select
                    id="sort"
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: '5px', fontSize: '18px', borderRadius: '5px' }}
                >
                    <option value="default">Default</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="completion">Completion Status</option>
                    <option value="createdAt">Creation Date</option>
                </select>
            </div>
            

                {habits.length > 0 ? <HabitList
                    habits={habits}
                    toggleComplete={toggleComplete}
                    deleteHabit={deleteHabit}
                /> : (
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        Oops! You dont have any habits saved yet
                    </div>
                )}
          
        </div>
    );
};

export default HabitListPage;
