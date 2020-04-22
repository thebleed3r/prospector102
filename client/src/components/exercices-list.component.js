import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Prospection = props => (
  <tr>
    <td>{props.prospection.companyName}</td>
    <td>{props.prospection.jobTitle}</td>
    <td>{props.prospection.location}</td>
    <td>{props.prospection.applicationDate.substring(0,10)}</td>
    <td>{props.prospection.contact}</td>
    <td>{props.prospection.response}</td>
    <td>
      <Link to={"/edit/"+props.prospection._id}>
          <svg className="bi bi-pencil" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd"/>
          </svg>
        </Link> | <a href="" onClick={() => { props.deleteProspection(props.prospection._id) }}>
          <svg className="bi bi-trash" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
          </svg>
        </a>
    </td>
  </tr>
)

export default class ProspectionList extends Component {
  constructor(props) {
    super(props);

    this.deleteProspection = this.deleteProspection.bind(this)

    this.state = {prospections: []};
  }

  componentDidMount() {
    axios.get('https://glacial-shelf-37833.herokuapp.com/prospections/')
      .then(response => {
        this.setState({ prospections: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProspection(id) {
    axios.delete('https://glacial-shelf-37833.herokuapp.com/prospections/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      prospections: this.state.prospections.filter(el => el._id !== id)
    })
  }

  prospectionList() {
    return this.state.prospections.map(currentprospection => {
      return <Prospection prospection={currentprospection} deleteProspection={this.deleteProspection} key={currentprospection._id}/>;
    })
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <p className="lead p-2 mb-2">Logged Prospections:</p>
          <Link to="/create" className="nav-link text-dark"><span className="btn">Add new entry</span></Link>
        </div>
        <table className="table table-borderless table-sm">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Application Date</th>
              <th>Contact</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.prospectionList() }
          </tbody>
        </table>
      </div>
    )
  }
}