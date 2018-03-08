import React from 'react';
import ReactDOM from 'react-dom';

const slides_link = document.querySelector('#slides-link');

const Image = ({ link }) => {
  let template =
    <div className="container">
      <div className="label">
        <span className="tooltip-toggle" aria-label="Sample text for your tooltip!" tabIndex="0">
          <a href={ link } target="_blank"></a>
        </span>
      </div>
    </div>
  ;

  return ReactDOM.createPortal(template, slides_link);
};

export default Image;
