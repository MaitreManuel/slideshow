import React from 'react';
import ReactDOM from 'react-dom';

const slideshow_title = document.querySelector('#slideshow-title');

const Title = ({ title }) => {
  let template =
    <h1>{ title }</h1>
  ;

  return ReactDOM.createPortal(template, slideshow_title);
};

export default Title;
