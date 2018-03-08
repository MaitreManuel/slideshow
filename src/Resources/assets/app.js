// import scripts
import Admin from './admin/admin';
// import slideManager from './admin/slideManager';

// import styles
import './main.scss';

// DOM Ready
window.onload = () => {
  Admin.init();

  // let sManager = slideManager.getManager();
  //
  // sManager.login('herve@slideshow.fr', 'slideshow')
  //   .then(sManager.addSlide('Titre de la slide ajoutee', 'Description de la slide', 'url href', 'src'))
  //   .then(sManager.logout());
};
