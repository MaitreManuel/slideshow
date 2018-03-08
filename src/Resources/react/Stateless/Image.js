import React from 'react';
import ReactDOM from 'react-dom';

const slides_image = document.querySelector('#slides-image');

const Image = ({ src, id }) => {
  let template =
    <div className="item">
      <img data-id={ id } src={ src } />
    </div>
  ;

  return ReactDOM.createPortal(template, slides_image);
};

export default Image;
