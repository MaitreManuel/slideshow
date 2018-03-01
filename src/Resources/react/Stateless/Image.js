import React from 'react';
import ReactDOM from 'react-dom';

const slides_image = document.querySelector('#slides-image');

const Image = ({ src }) => {
  let template =
    <div className="item">
      <img src={ src } />
    </div>
  ;

  return ReactDOM.createPortal(template, slides_image);
};

export default Image;
