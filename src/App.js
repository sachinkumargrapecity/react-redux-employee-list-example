import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { ShowAllEmployees, Employees, store, Header } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {


    return (

      <Provider store={store}>
        <Router>
          <div id="Routers">
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Employees} />
              <Route path="/ShowAllEmployees" component={ShowAllEmployees} />
            </Switch>
          </div>
        </Router>

      </Provider>
    );
  }


}

export default App;
