import React, { Component } from 'react';
import '../App.css';

export default class Header extends Component {

  render() {
    return (
      <div className="jumbotron mt-1 p-3">
      <h1 className="display-4">Hello, everybody!</h1>
      <p className="lead">This is <span className="logo">PROSPECTOR</span>, a job prospection log list. Below you can see all the job oprtunities that I applied for beginning with April the 9th 2020.</p>
      <hr className="my-4" />
      <p>I am looking for a junior front dev job. Feel free to contact me at <span className="">a.victor.dev@gmail.com</span>.</p>
    </div>
    );
  }
}

