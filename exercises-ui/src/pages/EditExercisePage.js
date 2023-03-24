import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {

    const navigate = useNavigate();

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status} (Invalid input)`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                className="createBoxes"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                className="createBoxes"
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                className="createBoxes"
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select 
                className="createBoxes"
                value={unit} 
                onChange={e => setUnit(e.target.value)} >
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                className="createBoxes"
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;