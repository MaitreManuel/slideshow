// import scripts
import * as Slideshow from './slideshow/initialize';
import Admin from './admin/admin';

// import styles
import './main.scss';

// DOM Ready
window.onload = () => {
  Slideshow.init();
  Admin.init();
};
