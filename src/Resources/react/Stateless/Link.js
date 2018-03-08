import React from 'react';
import ReactDOM from 'react-dom';

const slides_link = document.querySelector('#slides-link');

const Image = ({ link, title }) => {
  let template =
    <div className="item">
      <a href={ link } target="_blank" className="links">{ 'Page vers '+ title }</a>
    </div>
  ;

  return ReactDOM.createPortal(template, slides_link);
};

export default Image;
