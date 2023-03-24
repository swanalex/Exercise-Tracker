import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigate from './components/Navigation';


import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();


  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <div className="headerDiv">
            <div className="textDiv">
              <header>
                <h1 className="text">Exercise Tracker App</h1>
                  <p className="text">This is an app where you can create, delete, or edit any exercise that you may come up with.
                    Use it if you want to create a workout plan for yourself, or if you're trying to get back into
                    shape!
                  </p>
              </header>
            </div>
          </div>
          <Navigate />
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/create-exercise" element={<CreateExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
		  </Routes>
          </div>
      </Router>
        <br />
        <div className="footerDiv">
        <footer className="footer">© 2023 Alexander Swanson</footer>
        </div>
    </div>
  );
}

export default App;