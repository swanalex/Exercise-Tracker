import React from 'react';
import { Link } from 'react-router-dom';

function Navigate() {
    return (

        <nav>
            <Link to="/"><button className="navButton">Home</button></Link>
            <Link to="/create-exercise"><button className="navButton">Add</button></Link>
        </nav>
    )
}

export default Navigate;