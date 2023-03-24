import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the title, year and language provided in the body
 */
app.post('/exercises', (req, res) => {
    if (req.body.name.length > 0 && req.body.reps > 0 && req.body.weight > 0 
        && (req.body.unit === 'kgs' || req.body.unit === 'lbs') 
        && exercises.isDateValid(req.body.date)) {

            exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
                .then(exercise => {
                    res.status(201).json(exercise);
                })
                .catch(error => {
                    console.error(error);
                    res.status(400).json({ Error: 'Invalid Request'});
                });
    } else {
        res.status(400).json({ Error: 'Invalid Request'});
    }
}
);


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not Found'});
            }
        })
});

/**
 * Retrieve exercises. 
 * If the query parameters include a year, then only the exercises for that year are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    if (req.query !== undefined) {
        filter = req.query;
    }
    exercises.findExercises(filter)
        .then(exercises => {
            res.send(exercises);
        })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    if (!exercises.isValid(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)) {
        res.status(400).json({ Error: 'Invalid Request'})
    } else {
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(numUpdated => {
                if (numUpdated === 1) {
                    res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
                } else {
                    res.status(404).json({ Error: 'Not Found' });
                }
            });
    };
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(numDeleted => {
            if (numDeleted === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not Found'});
            }
        });
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});