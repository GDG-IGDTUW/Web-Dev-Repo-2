import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import HabitList from './HabitList';
import '../styling/HabitListPage.css'; // Import the CSS file

const HabitListPage = () => {
   
    const { habits, toggleComplete, deleteHabit } = useContext(HabitContext);
    return (
        <div className="habit-page">
            
            <h1 style={{display:"flex",justifyContent:"center",color:"#4a90e2",fontSize: "50px"}}>All Habits</h1>
           
            {/* <div className="habit-page-title" style={{ fontFamily: "dancing", fontSize: "30px" }}></div> */}
            

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
