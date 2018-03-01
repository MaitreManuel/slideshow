import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const react_entry_point = document.getElementById('react-entry-point');

class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('React loaded');
  }

  render() {
    return (null);
  }
} export default Root;

if(react_entry_point) {
  ReactDOM.render(<Root/>, react_entry_point);
}
