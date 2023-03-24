import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                className="createBoxes"
                type="text"
                placeholder="Exercise name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                className="createBoxes"
                type="number"
                value={reps}
                placeholder="Number of reps"
                onChange={e => setReps(e.target.value)} />
            <input
                className="createBoxes"
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                className="createBoxes" 
                value={unit} 
                onChange={e => setUnit(e.target.value)} >
                <option>  </option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                className="createBoxes"
                type="text"
                placeholder="Date created (mm-dd-yy)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;