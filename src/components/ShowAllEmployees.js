import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sad, sort } from '../images';
import { orderBy } from 'lodash';
import "../css/showAllEmployees.css";

class ShowAllEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 1,
            end: 5,
            searchFor: '',
            employees: this.props.employees,
            sorted: {
                name: "ASC",
                designation: "ASC",
                date: "ASC",
                description: "ASC",
                marriageStatus: "ASC",
                gender: "ASC"
            }
        }

    }


    render() {
        let searchForm = <form className="form-inline" onSubmit={this.searchBox}>
            <div className="form-group mb-2">
                <label className="sr-only">Search</label>
                <input onChange={this.searchBoxOnchange} type="text" className="form-control" placeholder="Search For" />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>;

        if (Object.keys(this.props.employees).length === 0) {
            return <div>No employees found. Please Add Some. <Link className="btn btn-warning" to="/">Add Employees</Link></div>
        }

        if (this.state.searchFor && this.state.employees.length === 0) {
            return <div>{searchForm}No employees found. Please Try Another Phrase. <img height="50px" width="50px" alt=":-(" src={sad} /></div>
        }

        return <div> {searchForm}
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" >Name<img name="name"  onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scope="col" >Designation<img name="designation" onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scopte="col" >Gender<img name="gender" onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scope="col" >Description<img name="description" onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scope="col" >Marriage Status<img name="marriageStatus" onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scope="col">Date Of Joining<img name="date" onClick={this.sortMe} alt="<=>" src={sort}></img></th>
                        <th scope="col"  >Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.showListWithRange().map((item, index) => {
                            return (
                                <tr className="table-info" key={index}>
                                    <td>{item.name}</td>


                                    <td>{item.designation}</td>

                                    <td>{item.gender}</td>

                                    <td>{item.description}</td>

                                    <td>{item.marriageStatus}</td>

                                    <td>{this.formatDate(item.date)}</td>

                                    <td>   <Link to={{ pathname: "/", state: { id: item.id } }}>Edit</Link></td>

                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger margin-btn" onClick={this.previous}>Previous Page</button> <button className="btn btn-danger" onClick={this.next}>Next Page</button>
            </div>
        </div>;
    }


    previous = () => {
        let start = this.state.start;
        if (start - 5 < 1) start = 1;
        else start -= 5;
        this.setState({ start: start });
    }

    next = () => {
        let start = this.state.start;

        if (start < Object.keys(this.state.employees).length) start += 5;
        this.setState({ start: start });
    }

    sortMe = (event) => {
        let order = 'asc'
        if (this.state.sorted[event.target.name] === 'ASC') {

            order = 'desc';
            this.setState({ sorted: Object.assign({ ...this.state.sorted }, { [event.target.name]: 'DESC' }) })
        }
        else {
            order = 'asc';
            this.setState({ sorted: Object.assign({ ...this.state.sorted }, { [event.target.name]: 'ASC' }) })
        }
        if (order === 'asc')
            this.setState({ employees: orderBy(this.state.employees, event.target.name, [order]) });
        else
            this.setState({ employees: orderBy(this.state.employees, event.target.name, [order]) });

    }

    searchBoxOnchange = (event) => {
        let searchFor = this.state.searchFor;
        if (searchFor === undefined || event.target.value === '') {
            this.setState({employees:this.props.employees});
        }
        else {
            this.setState({ searchFor: event.target.value })
        }
    }



    searchBox = (event) => {
        let matched = [];
        let searchFor = this.state.searchFor;
        console.log(this.state);

        if (searchFor === undefined || event.target.value === '') {
            this.setState(this.props.employees);
        }

        else {

            // apply filters
            Object.keys(this.props.employees).forEach((key) => {
                if (this.props.employees[key].name.toLowerCase() === searchFor.toLowerCase() || this.props.employees[key].designation.toLowerCase() === searchFor.toLowerCase()) {
                    matched.push(this.props.employees[key]);
                }
            });
            this.setState({ employees: matched }, () => console.log(this.state));

        }

        event.preventDefault();


    }

    showListWithRange = () => {
        let fiveEmployees = [];
        let start = this.state.start;
        let localStart = 1;
        for (let key in this.state.employees) {
            if (start > localStart) {
                localStart++;
                continue;
            }
            fiveEmployees.push(this.state.employees[key]);

            localStart++;
            if (localStart === start + 5) break;

        }
        return fiveEmployees;
    }

    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

}

const mapStateToProps = state => {

    return { employees: state };
}

export default connect(mapStateToProps)(ShowAllEmployees);