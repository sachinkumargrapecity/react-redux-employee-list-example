import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddEmployee, UpdateEmployee } from './Actions';
import Calendar from 'react-calendar';
import '../css/Employees.css';

class Employee extends Component {
    constructor(props) {
        super(props);

        // Update values based on the id received from 'Edit' link.
        if (props.location.state 
            && props.location.state.id 
            && props.editFrom[props.location.state.id] !== undefined) {
            let idOfData = props.location.state.id;
            let dataFromProps = props.editFrom[idOfData];
            this.state = {
                toDispatch: {
                    info: {
                        name: dataFromProps.name,
                        designation: dataFromProps.designation,
                        gender: dataFromProps.gender,
                        description: dataFromProps.description,
                        marriageStatus: dataFromProps.marriageStatus,
                        date: dataFromProps.date
                    },
                },
                marriedChecked: (dataFromProps.marriageStatus === 'Married') ? true : false,
                unmarriedChecked: (dataFromProps.marriageStatus === 'Unmarried') ? true : false,
                calendar: true,
                submitSuccess: false,
                updateCall: true
            };
        }
        else {
            this.state = {
                toDispatch: {
                    info: {
                        designation: "Manager",
                        date: new Date()
                    }
                },
                MarriedChecked: false,
                UnmarriedChecked: false,
                calendar: false,
                submitSuccess: false,
                updateCall: false
            }
        }
    }
    render() {
        return (

            <div className="d-flex">
                <form className='form-group' onSubmit={this.submitHandler}>
                    <label className="btn btn-primary active">Name</label><br />
                    <input className="form-control" value={this.state.toDispatch.info.name} name="name" onChange={this.changeHandler} required></input><br />

                    <label className="btn btn-primary active">Designation</label><br />
                    <select className="form-control form-control-sm" value={this.state.toDispatch.info.designation} name="designation" onChange={this.changeHandler} required>
                        <option value="Manager">Manager</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="General Employee">General Employee</option>
                    </select><br />


                    <label className="btn btn-primary active">Gender</label><br />
                    <input className="form-check-input" type="radio" name="gender" value="Male" onChange={this.changeHandler} required checked={this.state.toDispatch.info.gender === 'Male'}></input>
                    <span>Male</span><br />
                    <input className="form-check-input" type="radio" name="gender" value="Female" onChange={this.changeHandler} required checked={this.state.toDispatch.info.gender === 'Female'}></input>
                    <span>Female</span><br />

                    <label className="btn btn-primary active">Description</label><br />
                    <textarea value={this.state.toDispatch.info.description} name="description" onChange={this.changeHandler} rows="5" cols="50" required></textarea><br />

                    <label className="btn btn-primary active">Is Married?</label><br />
                    <input className="form-check-input" type="checkbox" value="Married" name="marriageStatus" onChange={this.changeHandler} onClick={this.checkUncheck} checked={this.state.marriedChecked}></input>
                    <span className="form-check-label">Married</span><br />
                    <input className="form-check-input" type="checkbox" value="Unmarried" name="marriageStatus" onChange={this.changeHandler} onClick={this.checkUncheck} checked={this.state.unmarriedChecked}></input>
                    <span className="form-check-label">Unmarried</span><br />

                    <label className="btn btn-primary active">Date Of Joining</label>
                    <img onClick={this.hideShowCalender} height="26px" width="26px" style={{ margin: '1%' }} alt="Click to Choose Date" src="https://i.imgur.com/5xd9q8U.png"></img>
                    <div className={this.state.calendar ? "show" : "hide"}>
                        <Calendar value={this.state.toDispatch.info.date} name="Date" onChange={this.changeHandler} /></div><br />
                    <button className="btn btn-success">Submit</button>
                    <span className={this.state.submitSuccess ? "show text-muted" : "hide"}>Success</span>
                </form>
            </div>)
    }

    submitHandler = (event) => { // event.target.value //name //type
        if (this.state.toDispatch.info.date === undefined && this.state.toDispatch.info.marriageStatus === undefined) {
            alert("Choose the marriage status and date"); return;
        }
        else if (this.state.toDispatch.info.date === undefined) {
            alert("Choose the date"); return;
        }
        else if (this.state.toDispatch.info.marriageStatus === undefined) {
            alert("Choose the marriage status"); return;
        }
        // check if update call or add new call
        if (this.state.updateCall) {
            UpdateEmployee({id:this.props.location.state.id , info:this.state.toDispatch.info});
        }
        else {
            this.setState({ submitSuccess: true }, () => { AddEmployee(this.state.toDispatch.info); });
        }
        event.preventDefault();
    }

    changeHandler = (event) => {

        // hide success message
        if (this.state.submitSuccess) this.setState({ submitSuccess: false });
        // date is recevied in event itself as object 
        //so check if date
        if (Object.prototype.toString.call(event) === '[object Date]') {
            this.setState({ toDispatch: { info: Object.assign({ ...this.state.toDispatch.info, date: event }) } });
            return;
        }
        let targetValue = event.target.value;
        this.setState({ toDispatch: { info: Object.assign({ ...this.state.toDispatch.info, [event.target.name]: targetValue }) } });
    }

    checkUncheck = (event) => {
        if (this.state.unmarriedChecked === true && event.target.checked === true && event.target.value === 'Married') {
            this.setState({ MarriedChecked: true, UnmarriedChecked: false });
        }
        else if (this.state.unmarriedChecked === false && event.target.checked === true && event.target.value === 'Unmarried') {
            this.setState({ MarriedChecked: false, UnmarriedChecked: true });
        }
        else {
            event.target.checked = true;
            if (event.target.value === 'Married') {
                this.setState({ MarriedChecked: true, UnmarriedChecked: false });
            }
            else {
                this.setState({ MarriedChecked: false, UnmarriedChecked: true });
            }
        }
    }

    hideShowCalender = () => {
        if (this.state.calendar)
            this.setState({ calendar: false });
        else
            this.setState({ calendar: true });
    }
}

const mapStateToProps = (newState) => {

    return { editFrom: newState };
}


export default connect(mapStateToProps, { AddEmployee, UpdateEmployee })(Employee);
