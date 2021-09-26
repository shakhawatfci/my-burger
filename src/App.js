import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import Routes from './router/index';



export default function App() {

    return (
        <Router>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="text-center">
                            <ul className="MyNav">
                                <li >
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/demand">Demand</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                {/* React Switch */}
                <Routes />
            </div>
        </Router>
    );
}
