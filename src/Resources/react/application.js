import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SlideGenerator from './Stateful/SlideGenerator';

const react_entry_point = document.getElementById('react-entry-point');

class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('React loaded');
  }

  render() {
    return (<SlideGenerator/>);
  }
} export default Root;

if(react_entry_point) {
  require('inferno-devtools');
  ReactDOM.render(<Root/>, react_entry_point);
}
