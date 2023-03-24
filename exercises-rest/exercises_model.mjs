import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, minimum: 1 },
    weight: { type: Number, required: true, minimum: 1 },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);





/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JavaScript object for the document created by calling save
 */

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}


function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
};


function isValid(name, reps, weight, unit, date) {
    if (name.length > 0 && reps > 0 && weight > 0 
        && (unit === 'kgs' || unit === 'lbs') 
        && isDateValid(date)) {
            return true
        } else {
            return false
        }
}


const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}


const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}


const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}


const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
}


export {createExercise, isDateValid, isValid, findExercises, deleteById, findExerciseById, replaceExercise};