import React from 'react';
import ReactDOM from 'react-dom';

const slides_text = document.querySelector('#slides-text');

const Text = ({ title }) => {
  let template =
    <div className="item">
      { title }
    </div>
  ;

  return ReactDOM.createPortal(template, slides_text);
};

export default Text;
