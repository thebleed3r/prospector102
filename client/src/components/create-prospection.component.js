import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateProspection extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeApplicationDate = this.onChangeApplicationDate.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeResponse = this.onChangeResponse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyName: '',
      jobTitle: '',
      location: '',
      applicationDate: new Date(),
      contact: '',
      response: ''
    }
  }

  componentDidMount() {
    axios.get('https://glacial-shelf-37833.herokuapp.com/prospections/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            prospection: response.data.map(p => p.companyName),
            companyName: response.data[0].companyName
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    })
  }

  onChangeJobTitle(e) {
    this.setState({
      jobTitle: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeApplicationDate(date) {
    this.setState({
      applicationDate: date
    })
  }

  onChangeContact(e) {
    this.setState({
      contact: e.target.value
    })
  }

  onChangeResponse(e) {
    this.setState({
      response: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const prospection = {
      companyName: this.state.companyName,
      jobTitle: this.state.jobTitle,
      location: this.state.location,
      applicationDate: this.state.applicationDate,
      contact: this.state.contact,
      response: this.state.response
    }

    console.log(prospection);

    axios.post('https://glacial-shelf-37833.herokuapp.com/prospections/add', prospection)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
      <div className="d-flex justify-content-between mb-2">
      <p className="lead p-2">Add New Prospection Entry:</p>
      <Link to="/"><span className="btn">go back</span></Link>
      </div>
      <form onSubmit={this.onSubmit}>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Company Name:</span>
          </div>
          <input  type="text"
              required
              className="form-control"
              value={this.state.companyName}
              onChange={this.onChangeCompanyName}
            />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Job Title:</span>
          </div>
          <input 
              type="text" 
              className="form-control"
              value={this.state.jobTitle}
              onChange={this.onChangeJobTitle}
              />
              
        </div>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Location:</span>
          </div>
          <input 
              type="text" 
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Contact Information:</span>
          </div>
          <input 
              type="text" 
              className="form-control"
              value={this.state.contact}
              onChange={this.onChangeContact}
              />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">Response:</span>
          </div>
          <input 
              type="text" 
              className="form-control"
              value={this.state.response}
              onChange={this.onChangeResponse}
              />
        </div>
        <div className="input-group mb-2">
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon3">Application Date:</span>
          </div>
          <div className="my-auto">
            <DatePicker
              selected={this.state.applicationDate}
              onChange={this.onChangeApplicationDate}
            />
          </div>
        </div>
        <div className="form-group text-right">
          <input type="submit" value="Add New entry" className="btn" />
        </div>
      </form>
    </div>
    )
  }
}
