import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            const newExercises = exercises.filter(m => m._id !== _id);  // because we want to return all of the exercises EXCEPT the one that got 'deleted'
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }

    const loadExercises = async exercise => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data)
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2 className="text">Workout Plan</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/create-exercise"><button className="createButton">Create new exercise</button></Link>
        </>
    );
}

export default HomePage;