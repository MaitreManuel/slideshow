import React from 'react';
import ReactDOM from 'react-dom';

const slides_description = document.querySelector('#slides-description');

const Description = ({ description }) => {
  let template =
    <div className="item">
      { description }
    </div>
  ;

  return ReactDOM.createPortal(template, slides_description);
};

export default Description;
