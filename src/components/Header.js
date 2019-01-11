import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../css/header.css";

class Header extends Component {
    render() {

        return <div className=" justify-content-center margin" >
            <ul className="nav alert alert-secondary btn-info active" >
                <li className="nav-item">
                    <Link className="nav-link whiteColor" to="/ShowAllEmployees">Show All Employees</Link>
                </li>
                <li className="nav-item">
                    <Link  className="nav-link whiteColor" to="/">Add Employees</Link>
                </li>
            </ul>
        </div>
    }
}

export default Header;