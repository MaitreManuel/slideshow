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

  /*
  * pour tester le login / set / logout
  * */
  //sManager.login('herve@slideshow.fr', 'slideshow')
  //  .then(sManager.addSlide('Titre de la slide ajoutee', 'Description de la slide', 'url href', 'src'))
  //  .then(sManager.logout());
};
