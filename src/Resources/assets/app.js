// import scripts
import * as Slideshow from './slideshow/initialize';
import Admin from './admin/admin';
import slideManager from './admin/slideManager';

// import styles
import './main.scss';

// DOM Ready
window.onload = () => {
  Slideshow.init();
  Admin.init();

  let sManager = new slideManager();
  const slides = sManager.getSlides();
  slides.then((e) => {
    console.log(e.val());
  });

};
