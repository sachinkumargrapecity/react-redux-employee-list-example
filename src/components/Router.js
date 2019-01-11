import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ShowAllEmployees, Employees } from './';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Employees} />
                <Route path="/ShowAllEmployees" component={ShowAllEmployees} />
            </Switch>
        </Router>
    );
}

export default Routes;