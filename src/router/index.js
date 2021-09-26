import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Demand from './Pages/Demand';
import DemandDetails from './Pages/DemandDetails';

export default function Routes() {

    return (

        <Switch>
            <Route exact path="/about">
                <About />
            </Route>

            <Route exact path="/demand">
                <Demand />
            </Route>

            <Route exact path="/demand/:id/:title">
                <DemandDetails />
            </Route>

            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    )
}